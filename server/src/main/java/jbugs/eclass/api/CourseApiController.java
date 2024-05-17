package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.*;
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
import java.util.stream.IntStream;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class CourseApiController {
    private final WeekService weekService;
    private final EnrollmentRepository enrollmentRepository;
    private final QuizService quizService;
    private final AssignmentService assignmentService;
    private final MaterialService materialService;
    private final VideoMaterialService videoMaterialService;

    @GetMapping("/{enrollmentId}")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long enrollmentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            CourseContentDto courseContentDto = new CourseContentDto();
            MemberInfoDto memberInfoDto = new MemberInfoDto();
            memberInfoDto.setMemberId(loginMember.getId());
            memberInfoDto.setMemberName(loginMember.getName());
            memberInfoDto.setMemberType(loginMember.getMemberType());
            if (loginMember.getMemberType() == MemberType.STUDENT) {
                memberInfoDto.setFirstTrack(loginMember.getStudent().getFirstTrack());
                memberInfoDto.setStudentId(loginMember.getStudent().getId());
            }
            courseContentDto.setMemberInfoDto(memberInfoDto);

            Enrollment enrollment = enrollmentRepository.findOne(enrollmentId);

            CourseDto courseDto = new CourseDto();
            courseDto.setLectureName(enrollment.getLecture().getName());
            courseDto.setDivision(enrollment.getLecture().getDivision());
            courseContentDto.setCourseDto(courseDto);

            // ----------------TEST
//            TestDto testDto = new TestDto();
//            List<AssignmentDto> assignmentDtoList = assignmentService.findAssignmentsByLecture(enrollment.getLecture().getId());
//            testDto.setAssignments(assignmentDtoList);
//
//            List<QuizDto> quizDtoList = quizService.findAllQuizzesByLectureAndStudent(enrollment.getLecture().getId(), enrollment.getStudent().getId(), enrollment);
//            testDto.setQuizDtoList(quizDtoList);
//
//            List<FileDto> fileDtoList = materialService.findMaterialsByLecture(enrollment.getLecture().getId());
//            testDto.setClassFiles(fileDtoList);
//
//            List<LectureVideoDto> lectureVideoDtoList = videoMaterialService.findVideoMaterialsByLecture(enrollment.getLecture().getId());
//            testDto.setLectureVideos(lectureVideoDtoList);
//
//            courseContentDto.setTestDto(testDto);
            // -----------------
            List<Week> weeks = weekService.findWeeksByLectureId(enrollment.getLecture().getId());

            // 기존 getCourseInfo 메소드 내부에서 주석 처리된 부분 뒤에 이어서 추가합니다.
            List<WeeklyContentDto> weeklyContents = weeks.stream().map(week -> {
                WeeklyContentDto weeklyContentDto = new WeeklyContentDto();
                weeklyContentDto.setWeek(week.getWeekNumber());

                // 각 주차별 동영상, 자료, 퀴즈, 과제 정보 조회 및 설정
                List<AssignmentDto> assignmentDtos = assignmentService.findAssignmentsByWeekIdAndLectureId(week.getId(), enrollment.getLecture().getId());
                weeklyContentDto.setAssignments(assignmentDtos);

                List<LectureVideoDto> lectureVideoDtos = videoMaterialService.findVideoMaterialsByWeekIdAndLectureId(week.getId(), enrollment.getLecture().getId());
                weeklyContentDto.setLectureVideos(lectureVideoDtos);

                List<FileDto> fileDtos = materialService.findMaterialsByWeekIdAndLectureId(week.getId(), enrollment.getLecture().getId());
                weeklyContentDto.setClassFiles(fileDtos);

                if (loginMember.getMemberType() == MemberType.PROFESSOR) {
                    List<QuizDto> quizDtos = quizService.findQuizzesByLecture(enrollment.getLecture().getId());
                    weeklyContentDto.setQuizzes(quizDtos);
                } else{
                    List<QuizDto> quizDtoList = quizService.findQuizzesByWeekIdAndStudentId(week.getId(), loginMember.getStudent().getId(), enrollment);
                    weeklyContentDto.setQuizzes(quizDtoList);
                }

                return weeklyContentDto;
            }).collect(Collectors.toList());
            courseContentDto.setWeeklyContents(weeklyContents);

            return ResponseEntity.ok(courseContentDto);
        }
        else {
            // 세션이 없거나 로그인 되어있지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 없거나 로그인되어 있지 않습니다.");
        }
    }
}
