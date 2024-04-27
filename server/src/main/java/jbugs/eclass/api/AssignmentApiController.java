package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.MaterialService;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class AssignmentApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final AssignmentRepository assignmentRepository;

    @GetMapping("/{enrollmentId}/assignment")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            AssignmentContentDto assignmentContentDto = new AssignmentContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
            }
            assignmentContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            assignmentContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<Assignment> assignments = weekService.findAssignmentsByLectureId(enrollment.getLecture().getId());

            List<AssignmentDto> assignmentDtos = assignments.stream()
                    .map(AssignmentDto::from)
                    .collect(Collectors.toList());
            assignmentContentDto.setAssignmentDtoList(assignmentDtos);

            return ResponseEntity.ok(assignmentContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    //과제 업로드
    @PostMapping("/{enrollmentId}/assignment")
    public ResponseEntity<?> uploadAssignment(@PathVariable Long enrollmentId,
                                      @RequestBody AssignmentUploadDto assignmentUploadDto,
                                      HttpServletRequest request) throws IOException {
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
            Optional<Week> week = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), assignmentUploadDto.getWeekNumber());
            Week week1 = week.get();

            Assignment assignment = assignmentUploadDto.toEntity(week1);

            //이부분에 파일 업로드가 되어야한다.

            assignmentRepository.save(assignment);

            return ResponseEntity.ok().body("과제가 성공적으로 등록되었습니다.");
        } else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}
