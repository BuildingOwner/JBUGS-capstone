package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.ChatRepository;
import jbugs.eclass.repository.StudentRepository;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class ChatApiController {
    private final StudentRepository studentRepository;
    private final ChatRepository chatRepository;

    @GetMapping("/chat")
    public ResponseEntity<?> getChatInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            ChatContentDto chatContentDto = new ChatContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            chatContentDto.setMemberInfoDto(memberInfoDto);

            StudentDto studentDto = new StudentDto();
            studentDto.setStudentId(loginMember.getStudent().getId());
            chatContentDto.setStudentDto(studentDto);

            // 학생 ID에 해당하는 모든 ChatRoom 조회
            List<ChatRoom> chatRooms = chatRepository.findByStudentId(loginMember.getStudent().getId());
            List<ChatDto> chatDtoList = chatRooms.stream()
                    .map(chatRoom -> {
                        ChatDto chatDto = new ChatDto();
                        chatDto.setChatRoomId(chatRoom.getId());
                        chatDto.setChatRoomName(chatRoom.getChatRoomName());
                        return chatDto;
                    })
                    .collect(Collectors.toList());
            // 변환된 ChatDto 리스트를 ChatContentDto에 설정
            chatContentDto.setChatDtoList(chatDtoList);

            return ResponseEntity.ok(chatContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<?> createChatRoom(@RequestBody ChatRoomCreateDto request) {

        // 학생 ID로 학생 엔티티 조회
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + request.getStudentId()));

        // 새 채팅방 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomName("생성");
        chatRoom.setChattingJson(null);
        chatRoom.setStudent(student); // 학생 엔티티 설정

        // 채팅방 저장
        chatRepository.save(chatRoom);

        // 생성된 채팅방 정보를 반환 (필요에 따라 더 많은 정보를 포함시킬 수 있음)
        return ResponseEntity.status(HttpStatus.CREATED).body(
                Collections.singletonMap("chatRoomId", chatRoom.getId())
        );
    }

    @DeleteMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> deleteChatRoom(@PathVariable Long chatRoomId) {
        // 채팅방 존재 여부 확인
        ChatRoom chatRoom = chatRepository.findById(chatRoomId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "ChatRoom not found with id: " + chatRoomId));

        // 채팅방 삭제
        chatRepository.delete(chatRoom);

        // 성공 응답 반환
        return ResponseEntity.ok().body("ChatRoom with id: " + chatRoomId + " was deleted successfully.");
    }
}
