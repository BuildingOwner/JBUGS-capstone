package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Enrollment;
import jbugs.eclass.domain.Member;
import jbugs.eclass.domain.MemberType;
import jbugs.eclass.dto.AssignmentDto;
import jbugs.eclass.dto.MainInfoDto;
import jbugs.eclass.dto.MainLectureDto;
import jbugs.eclass.dto.MemberInfoDto;
import jbugs.eclass.repository.*;
import jbugs.eclass.service.EnrollmentService;
import jbugs.eclass.service.MemberService;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class MainApiController {

    private final EnrollmentService enrollmentService;
    private final WeekService weekService;

    @GetMapping("/main")
    public ResponseEntity<?> getMainPageInfo(HttpServletRequest request) {
        // 현재 로그인된 사용자의 정보를 가져옴
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // 사용자와 관련된 enrollment 정보 조회
            List<Enrollment> enrollments = enrollmentService.findAllByStudentId(loginMember.getId());

            MainInfoDto mainInfoDto = new MainInfoDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
            }
            mainInfoDto.setMemberInfoDto(memberInfoDto);

            List<MainLectureDto> lectureInfos = enrollments.stream().map(enrollment -> {
                MainLectureDto lectureInfo = new MainLectureDto();
                lectureInfo.setEnrollmentId(enrollment.getId());
                lectureInfo.setLectureName(enrollment.getLecture().getName());
                lectureInfo.setProfessorName(enrollment.getLecture().getProfessor().getMember().getName());
                lectureInfo.setDivision(enrollment.getLecture().getDivision());
                lectureInfo.setClassification(enrollment.getLecture().getClassification());
                lectureInfo.setLectureTime(enrollment.getLecture().getLectureTime());

                // 과제 정보 설정
                List<Assignment> assignments = weekService.findValidAssignmentsByLectureId(enrollment.getLecture().getId());
                List<AssignmentDto> assignmentDtos = assignments.stream()
                        .map(AssignmentDto::from) // 변경된 부분
                        .collect(Collectors.toList());
                lectureInfo.setAssignments(assignmentDtos);

                return lectureInfo;
            }).collect(Collectors.toList());
            mainInfoDto.setMainLectures(lectureInfos);

            return ResponseEntity.ok(mainInfoDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}

