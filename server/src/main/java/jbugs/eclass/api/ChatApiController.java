package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.ChatRepository;
import jbugs.eclass.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

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

            // 학생 ID에 해당하는 모든 ChatRoom 조회
            List<ChatRoom> chatRooms = chatRepository.findByMemberId(loginMember.getId());
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
        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + request.getMemberId()));

        // 새 채팅방 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomName("생성");
        chatRoom.setChattingJson(null);
        chatRoom.setMember(member); // 학생 엔티티 설정

        // 채팅방 저장
        chatRepository.save(chatRoom);

        // 생성된 채팅방 정보를 반환 (필요에 따라 더 많은 정보를 포함시킬 수 있음)
        return ResponseEntity.status(HttpStatus.CREATED).body(
                Collections.singletonMap("chatRoomId", chatRoom.getId())
        );
    }

    @DeleteMapping("/chat")
    public ResponseEntity<?> deleteChatRooms(@RequestBody List<Long> chatRoomIds) {
        // chatRoomIds의 모든 ID에 대한 채팅방 삭제
        chatRepository.deleteAllById(chatRoomIds);

        // 성공 응답 반환
        return ResponseEntity.ok().body("ChatRooms with ids: " + chatRoomIds + " were deleted successfully.");
    }
}
