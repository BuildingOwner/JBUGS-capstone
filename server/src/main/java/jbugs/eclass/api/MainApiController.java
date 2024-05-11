package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class MainApiController {

    private final EnrollmentRepository enrollmentRepository;
    private final WeekService weekService;
    private final QuizInfoRepository quizInfoRepository;
    private final QuizRepository quizRepository;

    @GetMapping("/main")
    public ResponseEntity<?> getMainPageInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            if (loginMember != null) {
                MainInfoDto mainInfoDto = buildMainInfoDto(loginMember);

                return ResponseEntity.ok(mainInfoDto);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("해당 멤버를 찾을 수 없습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    private MainInfoDto buildMainInfoDto(Member loginMember) {
        MemberInfoDto memberInfoDto = new MemberInfoDto();
        memberInfoDto.setMemberId(loginMember.getId());
        memberInfoDto.setMemberName(loginMember.getName());
        memberInfoDto.setMemberType(loginMember.getMemberType());

        if (loginMember.getMemberType() == MemberType.STUDENT) {
            memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
            memberInfoDto.setStudentId(loginMember.getStudent().getId());
        }

        MainInfoDto mainInfoDto = new MainInfoDto();
        mainInfoDto.setMemberInfoDto(memberInfoDto);

        List<Enrollment> enrollments = enrollmentRepository.findAllByStudentId(loginMember.getId());

        List<MainLectureDto> lectureInfos = enrollments.stream().map(this::buildMainLectureDto).collect(Collectors.toList());
        mainInfoDto.setMainLectures(lectureInfos);

        return mainInfoDto;
    }

    private MainLectureDto buildMainLectureDto(Enrollment enrollment) {
        MainLectureDto lectureInfo = new MainLectureDto();
        lectureInfo.setEnrollmentId(enrollment.getId());
        lectureInfo.setLectureName(enrollment.getLecture().getName());
        lectureInfo.setProfessorName(enrollment.getLecture().getProfessor().getMember().getName());
        lectureInfo.setDivision(enrollment.getLecture().getDivision());
        lectureInfo.setClassification(enrollment.getLecture().getClassification());
        lectureInfo.setLectureTime(enrollment.getLecture().getLectureTime());

        List<Assignment> assignments = weekService.findValidAssignmentsByLectureId(enrollment.getLecture().getId());
        List<AssignmentDto> assignmentDtos = assignments.stream()
                .map(AssignmentDto::from)
                .collect(Collectors.toList());
        lectureInfo.setAssignments(assignmentDtos);

        List<QuizDto> unattemptedQuizzes = findUnattemptedQuizzesByStudentId(enrollment.getStudent().getId());
        lectureInfo.setQuizDtoList(unattemptedQuizzes);

        return lectureInfo;
    }

    public List<QuizDto> findUnattemptedQuizzesByStudentId(Long studentId) {
        // 학생의 수강 정보를 가져옵니다.
        List<Enrollment> enrollments = enrollmentRepository.findAllByStudentId(studentId);

        // 미응시 퀴즈 목록을 저장할 리스트를 초기화합니다.
        List<QuizDto> unattemptedQuizzes = new ArrayList<>();

        for (Enrollment enrollment : enrollments) {
            // 각 수강 정보에 해당하는 강의를 조회합니다.
            Lecture lecture = enrollment.getLecture();

            // 해당 강의에 속한 퀴즈들을 조회합니다.
            List<Quiz> quizzes = quizRepository.findByLectureId(lecture.getId());
            for (Quiz quiz : quizzes) {
                // 학생의 퀴즈 제출 상태를 조회합니다.
                Optional<QuizInfo> quizInfo = quizInfoRepository.findByQuizIdAndStudentId(quiz.getId(), studentId);
                // 제출하지 않은 퀴즈만 리스트에 추가합니다.
                if (!quizInfo.isPresent() || !quizInfo.get().isSubmissionStatus()) {
                    unattemptedQuizzes.add(QuizDto.from(quiz, quizInfo.orElse(null)));
                }
            }
        }

        return unattemptedQuizzes;
    }
}
