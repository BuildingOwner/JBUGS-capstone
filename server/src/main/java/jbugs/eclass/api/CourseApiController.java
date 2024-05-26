package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.VideoMaterialRepository;
import jbugs.eclass.service.*;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URLConnection;
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
    private final VideoMaterialRepository videoMaterialRepository;
    private final VideoPlaybackTimeService videoPlaybackTimeService;

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
            courseDto.setProfessorName(enrollment.getLecture().getProfessor().getMember().getName());
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

                List<LectureVideoDto> lectureVideoDtos = videoMaterialService.findVideoMaterialsByWeekIdAndLectureIdWithPlaybackTime(week.getId(), enrollment.getLecture().getId(), loginMember.getId());
                weeklyContentDto.setLectureVideos(lectureVideoDtos);

                List<FileDto> fileDtos = materialService.findMaterialsByWeekIdAndLectureId(week.getId(), enrollment.getLecture().getId());
                weeklyContentDto.setClassFiles(fileDtos);

                if (loginMember.getMemberType() == MemberType.PROFESSOR) {
                    List<QuizDto> quizDtos = quizService.findQuizzesByWeekIdAndLecture(week.getId(), enrollment.getLecture().getId());
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

    @GetMapping("/stream/{videoMaterialId}")
    public void streamVideo(@PathVariable Long videoMaterialId, HttpServletResponse response, HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(SessionConst.LOGIN_MEMBER) != null) {
            Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

            // 비디오 자료 조회
            VideoMaterial videoMaterial = videoMaterialRepository.findById(videoMaterialId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid videoMaterialId"));

            // 비디오 파일 검증
            File videoFile = new File(videoMaterial.getVideoPath());
            if (!videoFile.exists()) {
                throw new FileNotFoundException("비디오 파일을 찾을 수 없습니다.");
            }

            // mimeType 설정
            String mimeType = URLConnection.guessContentTypeFromName(videoFile.getName());
            if (mimeType == null) {
                mimeType = "video/mp4";
            }

            // 비디오 파일 스트리밍 준비
            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", "inline; filename=\"" + videoFile.getName() + "\"");
            response.setContentLength((int) videoFile.length());

            // 저장된 시청 시간 조회 및 응답 헤더에 추가
            Long playbackTime = videoPlaybackTimeService.findByMemberIdAndVideoMaterialId(loginMember.getId(), videoMaterialId)
                    .map(VideoPlaybackTime::getPlaybackTime)
                    .orElse(0L); // playbackTime이 존재하지 않을 경우 0을 기본값으로 사용
            response.setHeader("Playback-Time", String.valueOf(playbackTime));

            // 비디오 스트리밍
            InputStream inputStream = new BufferedInputStream(new FileInputStream(videoFile));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        }
        else{
            // 세션이 없거나 로그인되어 있지 않은 경우
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
            response.getWriter().write("세션이 없거나 로그인되어 있지 않습니다."); // 메시지 작성
        }
    }

    @PostMapping("/save-time")
    public ResponseEntity<?> savePlaybackTime(@RequestBody VideoPlaybackTimeRequestDto requestDto) {
        videoPlaybackTimeService.findByMemberIdAndVideoMaterialId(requestDto.getMemberId(), requestDto.getVideoMaterialId())
                .ifPresentOrElse(currentPlaybackTime -> {
                    boolean isUpdated = false;

                    // 기존에 저장된 시청 시간이 제공된 시청 시간보다 작을 경우에만 업데이트
                    if (currentPlaybackTime.getPlaybackTime() < requestDto.getPlaybackTime()) {
                        currentPlaybackTime.setPlaybackTime(requestDto.getPlaybackTime());
                        isUpdated = true;
                    }

                    // 기존에 저장된 퍼센트가 제공된 퍼센트보다 작을 경우에만 업데이트
                    if (currentPlaybackTime.getPercent() < requestDto.getPercent()) {
                        currentPlaybackTime.setPercent(requestDto.getPercent());
                        isUpdated = true;
                    }

                    if (isUpdated) {
                        videoPlaybackTimeService.saveOrUpdatePlaybackTime(currentPlaybackTime.getMember().getId(),
                                currentPlaybackTime.getVideoMaterial().getId(),
                                currentPlaybackTime.getPlaybackTime(),
                                currentPlaybackTime.getPercent());
                        ResponseEntity.ok().body("시간 및 퍼센트 업데이트 완료");
                    } else {
                        ResponseEntity.ok().body("변경 사항 없음");
                    }
                }, () -> {
                    // 기존 시청 시간이 존재하지 않는 경우 새로 저장
                    videoPlaybackTimeService.saveOrUpdatePlaybackTime(requestDto.getMemberId(),
                            requestDto.getVideoMaterialId(),
                            requestDto.getPlaybackTime(),
                            requestDto.getPercent());
                    ResponseEntity.ok().body("시간 및 퍼센트 저장 완료");
                });
        return ResponseEntity.ok().body("처리 완료");
    }

}
