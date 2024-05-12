package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.Member;
import jbugs.eclass.domain.MemberType;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.service.QuizService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/answers")
public class AnswerApiController {
    private final QuizService quizService;
    private final QuizInfoRepository quizInfoRepository;

    @PostMapping("/{quizId}")
    public ResponseEntity<?> submitAnswers(@RequestBody AnswerDto answerDto) {
        try {
            quizService.saveAnswers(answerDto);
            return ResponseEntity.ok().body("정답이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            log.error("정답 저장 중 오류 발생", e); // 로깅 추가
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<?> getAnswersByQuizId(@PathVariable Long quizId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            AnswerContentDto answerContentDto = new AnswerContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            answerContentDto.setMemberInfoDto(memberInfoDto);

            Long studentId = loginMember.getStudent().getId();
            AnswerDto answerDto = quizService.getAnswersByQuizIdAndStudentId(quizId, studentId);
            answerContentDto.setAnswerDto(answerDto);

            return ResponseEntity.ok(answerContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}