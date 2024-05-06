package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.EnrollmentService;
import jbugs.eclass.service.QuizService;
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

            //enrollmentId에 해당하는 각 주차id가져오기
            Lecture lectureId = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

            List<Week> weeks = weekService.findWeeksByLectureId(lectureId.getId());

            // 기존 getCourseInfo 메소드 내부에서 주석 처리된 부분 뒤에 이어서 추가합니다.
            List<WeeklyContentDto> weeklyContents = weeks.stream().map(week -> {
                WeeklyContentDto weeklyContentDto = new WeeklyContentDto();
                weeklyContentDto.setWeek(week.getWeekNumber());

                // 각 주차별 동영상, 자료, 퀴즈, 과제 정보 조회 및 설정
                List<Assignment> assignments = weekService.findAssignmentsByWeekId(week.getId());
                List<AssignmentDto> assignmentDtos = assignments.stream()
                        .map(AssignmentDto::from) // 변경된 부분
                        .collect(Collectors.toList());
                weeklyContentDto.setAssignments(assignmentDtos);

                List<VideoMaterial> videoMaterials = weekService.findVideoMaterialsByWeekId(week.getId());
                List<LectureVideoDto> lectureVideoDtos = videoMaterials.stream()
                        .map(LectureVideoDto::from)
                        .collect(Collectors.toList());
                weeklyContentDto.setLectureVideos(lectureVideoDtos);

                List<Material> materials = weekService.findMaterialsByWeekId(week.getId());
                List<FileDto> fileDtos = materials.stream()
                        .map(FileDto::from)
                        .collect(Collectors.toList());
                weeklyContentDto.setClassFiles(fileDtos);

                List<Quiz> quizzes = weekService.findQuizzesByWeekId(week.getId());
                List<QuizDto> quizDtoList = quizzes.stream().map(quiz -> {
                    // Quiz에 해당하는 QuizInfo 객체를 조회
                    Optional<QuizInfo> quizInfoOptional = Optional.ofNullable(quizService.findQuizInfoByQuizId(quiz.getId()));
                    // QuizInfo 객체가 존재하는 경우 QuizDto 생성, 그렇지 않은 경우 null 반환
                    return quizInfoOptional.map(quizInfo -> QuizDto.from(quiz, quizInfo)).orElse(null);
                }).collect(Collectors.toList());
                weeklyContentDto.setQuizzes(quizDtoList);

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
