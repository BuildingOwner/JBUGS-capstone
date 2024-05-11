package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.QuizService;
import jbugs.eclass.service.WeekService;
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
public class MainApiController {

    private final EnrollmentRepository enrollmentRepository;
    private final WeekService weekService;
    private final QuizService quizService;

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

        List<Enrollment> enrollments = enrollmentRepository.findAllByStudentId(loginMember.getStudent().getId());

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

        List<QuizDto> quizDtos = quizService.findUnsubmittedQuizzesByLectureAndStudent(enrollment.getLecture().getId(), enrollment.getStudent().getId(), enrollment);
        lectureInfo.setQuizDtoList(quizDtos);

        return lectureInfo;
    }
}
