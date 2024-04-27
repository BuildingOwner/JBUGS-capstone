package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.NoticeRepository;
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
public class NoticeApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final NoticeRepository noticeRepository;

    @GetMapping("/{enrollmentId}/notice")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            NoticeContentDto noticeContentDto = new NoticeContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
            }
            noticeContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            noticeContentDto.setCourseDto(courseDto);

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<Notice> notices = noticeRepository.findNoticesByLecture(lectureId);

            List<NoticeDto> noticeDtoList = notices.stream()
                    .map(NoticeDto::from)
                    .collect(Collectors.toList());
            noticeContentDto.setNoticeDtoList(noticeDtoList);

            return ResponseEntity.ok(noticeContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

    @PostMapping("/{enrollmentId}/notice")
    public ResponseEntity<?> saveNotice(@PathVariable Long enrollmentId,
                                        @RequestBody NoticeSaveDto noticeSaveDto,
                                        HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // enrollmentId를 사용해 Lecture 객체 찾기
            Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
            if (lecture == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("강의를 찾을 수 없습니다.");
            }

            // NoticeSaveDto를 사용해 Notice 객체 생성 및 저장
            Notice notice = noticeSaveDto.toEntity(lecture); // Notice 객체 생성
            noticeRepository.save(notice); // Notice 객체 저장

            return ResponseEntity.ok().body("공지사항이 성공적으로 등록되었습니다.");
        } else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }

}