package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.NoticeRepository;
import jbugs.eclass.repository.QnARepoisitory;
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
@RequestMapping("/api/course")
public class QnaApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final QnARepoisitory qnARepoisitory;

    @GetMapping("/{enrollmentId}/qna")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            QnAContentDto qnAContentDto = new QnAContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            qnAContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            qnAContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<QnA> qnAList = qnARepoisitory.findQnAsByLecture(lectureId);

            List<QnADto> qnADtoList = qnAList.stream()
                    .map(QnADto::from)
                    .collect(Collectors.toList());
            qnAContentDto.setQnADtoList(qnADtoList);

            return ResponseEntity.ok(qnAContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}