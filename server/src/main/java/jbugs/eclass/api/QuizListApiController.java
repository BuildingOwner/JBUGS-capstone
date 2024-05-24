package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.service.QuizService;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class QuizListApiController {

    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final QuizService quizService;
    private final QuizRepository quizRepository;

    @GetMapping("/{enrollmentId}/quizList")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            QuizContentDto quizContentDto = new QuizContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            quizContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            courseDto.setProfessorName(enrollment.getLecture().getProfessor().getMember().getName());
            quizContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            List<Week> weeks = weekService.findWeeksByLectureId(lectureId.getId());


            if (loginMember.getMemberType() == MemberType.PROFESSOR) {
                List<QuizDto> allQuizDtoList = quizService.findQuizzesByLecture(enrollment.getLecture().getId());
                quizContentDto.setAllQuizDtoList(allQuizDtoList);
            } else{
                // 모든 퀴즈를 주차 정보와 함께 단일 리스트로 반환
                List<QuizDto> allQuizDtoList = weeks.stream()
                        .flatMap(week -> quizService.findQuizzesByWeekIdAndStudentId(week.getId(), loginMember.getStudent().getId(), enrollment).stream())
                        .collect(Collectors.toList());
                quizContentDto.setAllQuizDtoList(allQuizDtoList);
            }


            return ResponseEntity.ok(quizContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @PostMapping("/{enrollmentId}/quizList")
    public ResponseEntity<?> editQuiz(@PathVariable Long enrollmentId,
                                      @RequestBody QuizEditDto quizEditDto,
                                      HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // 사용자가 교수인지 확인
            if (loginMember.getMemberType() != MemberType.PROFESSOR) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
            }

            // enrollmentId를 사용해 Lecture 객체 찾기
            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }
            try {
                // 퀴즈 ID로 퀴즈 찾기
                Optional<Quiz> quiz = quizRepository.findById(quizEditDto.getQuizId());
                if (quiz.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("퀴즈를 찾을 수 없습니다.");
                }

                // 퀴즈 정보 수정
                quiz.get().setQuizName(quizEditDto.getQuizName());
                quiz.get().setDeadline(quizEditDto.getDeadline());
                quiz.get().setQuizType(quizEditDto.getQuizType());
                quiz.get().setDescription(quizEditDto.getDescription());

                // 수정된 퀴즈 저장
                quizService.saveQuiz(quiz.orElse(null));

                return ResponseEntity.ok().body("퀴즈가 성공적으로 수정되었습니다.");
            } catch (Exception e) {
                log.error("퀴즈 수정 중 예외 발생", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("퀴즈 수정 중 오류가 발생했습니다.");
            }
        } else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @GetMapping("/quizzes/{quizId}")
    public ResponseEntity<QuizDetailsDto> getQuizDetails(@PathVariable Long quizId) {
        return quizService.getQuizDetails(quizId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
