package jbugs.eclass.api;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.*;
import jbugs.eclass.dto.*;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.VideoMaterialRepository;
import jbugs.eclass.service.MaterialService;
import jbugs.eclass.service.WeekService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/course")
public class UploadApiController {
    private final EnrollmentRepository enrollmentRepository;
    private final WeekService weekService;
    private final MaterialService materialService;
    private final VideoMaterialRepository videoMaterialRepository;
    private final RestTemplate restTemplate;

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename){
        return fileDir + filename;
    }

    @PostMapping("/{enrollmentId}/upload")
    public ResponseEntity<?> uploadFile(@ModelAttribute UploadDto uploadDto,
                                        @PathVariable Long enrollmentId, HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
        Optional<Week> weekEntityOptional = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), uploadDto.getWeekNumber());

        if (weekEntityOptional.isPresent()) {
            Week weekEntity = weekEntityOptional.get();

            // 파일 업로드 처리
            if (uploadDto.getAttachFiles() != null && uploadDto.getAttachFiles().length > 0) {
                uploadFiles(Arrays.asList(uploadDto.getAttachFiles()), weekEntity.getId(), false, uploadDto.getFileTitle());
            }

            // 비디오 업로드 처리
            if (uploadDto.getVideoFiles() != null && uploadDto.getVideoFiles().length > 0) {
                uploadFiles(Arrays.asList(uploadDto.getVideoFiles()), weekEntity.getId(), true, uploadDto.getVideoTitle());
            }

            sendQuizKeywordRequest(lecture.getName(), String.valueOf(weekEntity.getWeekNumber()), fileDir+uploadDto.getAttachFiles(), uploadDto.getChoice(), uploadDto.getShortAnswer());

            // 성공적으로 파일이 저장된 경우
            return ResponseEntity.ok().body("파일이 성공적으로 업로드 되었습니다.");
        } else {
            // 주차 정보를 찾지 못한 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주차 정보를 찾을 수 없습니다.");
        }

    }

    public void uploadFiles(List<MultipartFile> files, Long weekId, boolean isVideo, String title) throws IOException {
        Week weekEntity = weekService.findWeekById(weekId).orElseThrow(() -> new IllegalArgumentException("Invalid weekId"));

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String fullPath;
                if (isVideo) {
                    fullPath = fileDir + "/video/" + file.getOriginalFilename(); // 비디오 파일의 경우
                } else {
                    fullPath = fileDir + file.getOriginalFilename(); // 일반 파일의 경우
                }
                log.info("{} 저장 fullPath={}", isVideo ? "비디오" : "파일", fullPath);
                file.transferTo(new File(fullPath));

                if (isVideo) {
                    VideoMaterial videoMaterial = new VideoMaterial();
                    videoMaterial.setVideoPath(fullPath);
                    videoMaterial.setVideoName(title);
                    videoMaterial.setWeek(weekEntity);
                    videoMaterialRepository.save(videoMaterial);
                } else {
                    Material material = new Material();
                    material.setFilePath(fullPath);
                    material.setFileName(title);
                    material.setWeek(weekEntity);
                    materialService.join(material);
                }
            }
        }
    }

    // 파일 업로드 로직 이후에 추가
    public void sendQuizKeywordRequest(String lecture, String week, String path, String choice, String shortAnswer) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("lecture", lecture);
        map.add("week", week);
        map.add("path", path);
        map.add("choice", choice);
        map.add("short", shortAnswer);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(map, headers);

        String url = "http://localhost:5000/add-quiz-keyword";

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        // 필요하다면 응답 처리
        log.info("Status Code: {}", responseEntity.getStatusCode());
        log.info("Response Body: {}", responseEntity.getBody());
    }
}
