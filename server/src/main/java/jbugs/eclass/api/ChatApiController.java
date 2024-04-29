package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.ChatRepository;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class ChatApiController {

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
}
