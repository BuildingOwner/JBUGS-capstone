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
import java.util.*;

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
    public ResponseEntity<?> uploadFile(@RequestParam(value = "fileTitle", required = false, defaultValue = "") String fileTitle,
                                        @RequestParam(value = "videoTitle", required = false, defaultValue = "") String videoTitle,
                                        @RequestParam("weekNumber") int weekNumber,
                                        @RequestParam(value = "attachFiles", required = false) MultipartFile[] attachFiles,
                                        @RequestParam(value = "videoFiles", required = false) MultipartFile[] videoFiles,
                                        @RequestParam("shortAnswer") String shortAnswer,
                                        @RequestParam("choice") String choice,
                                        @RequestParam("description") String description,
                                        @RequestParam("quizType") String quizType,
                                        @PathVariable Long enrollmentId, HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
        Optional<Week> weekEntityOptional = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), weekNumber);
        List<String> uploadedFilePaths = new ArrayList<>();
        if (weekEntityOptional.isPresent()) {
            Week weekEntity = weekEntityOptional.get();

            // 파일 업로드 처리
            if (attachFiles != null && attachFiles.length > 0) {
                uploadedFilePaths.addAll(uploadFiles(Arrays.asList(attachFiles), weekEntity.getId(), false, fileTitle, lecture));
            }

            // 비디오 업로드 처리 후 경로(들) 반환
            if (videoFiles != null && videoFiles.length > 0) {
                uploadFiles(Arrays.asList(videoFiles), weekEntity.getId(), true, videoTitle, lecture);
            }
            // 파일 경로(들)을 사용하여 추가 처리 수행
            for (String filePath : uploadedFilePaths) {
                sendQuizKeywordRequest(lecture.getId(),lecture.getName(), String.valueOf(weekEntity.getWeekNumber()), filePath, choice, shortAnswer, description, quizType);
            }

            // 성공적으로 파일이 저장된 경우
            return ResponseEntity.ok().body("파일이 성공적으로 업로드 되었습니다.");
        } else {
            // 주차 정보를 찾지 못한 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주차 정보를 찾을 수 없습니다.");
        }

    }

    public List<String> uploadFiles(List<MultipartFile> files, Long weekId, boolean isVideo, String title, Lecture lecture) throws IOException {
        Week weekEntity = weekService.findWeekById(weekId).orElseThrow(() -> new IllegalArgumentException("Invalid weekId"));
        List<String> filePaths = new ArrayList<>();
        String directory = isVideo ? fileDir + "video/" : fileDir;

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                // 파일명 보안 처리
                String originalFileName = file.getOriginalFilename();
                String safeFileName = UUID.randomUUID().toString() + "_" + originalFileName; // 예시로 UUID 추가

                String currentDirectory = System.getProperty("user.dir");
                if(currentDirectory.indexOf("JBUGS-capstone") == -1){
                    currentDirectory += "/JBUGS-capstone/server/";
                }
                String fullPath = currentDirectory + directory + originalFileName;
                long fileSize = file.getSize();

                log.info("{} 저장 fullPath={}", isVideo ? "비디오" : "파일", fullPath);
                file.transferTo(new File(fullPath));

                if (isVideo) {
                    VideoMaterial videoMaterial = new VideoMaterial();
                    videoMaterial.setVideoPath(fullPath);
                    videoMaterial.setTitle(title);
                    videoMaterial.setVideoName(originalFileName);
                    videoMaterial.setWeek(weekEntity);
                    videoMaterial.setFileSize(fileSize);
                    videoMaterial.setLecture(lecture);
                    videoMaterialRepository.save(videoMaterial);
                } else {
                    Material material = new Material();
                    material.setFilePath(fullPath);
                    material.setTitle(title);
                    material.setFileName(originalFileName);
                    material.setWeek(weekEntity);
                    material.setFileSize(fileSize);
                    material.setLecture(lecture);
                    materialService.join(material);
                    filePaths.add(fullPath);
                }
            }
        }
        return filePaths;
    }


    // 파일 업로드 로직 이후에 추가
    public void sendQuizKeywordRequest(Long lectureId, String lecture, String week, String path, String choice, String shortAnswer, String description, String quizType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("lectureId", String.valueOf(lectureId));
        map.add("lecture", lecture);
        map.add("week", week);
        map.add("path", path);
        map.add("choice", choice);
        map.add("short", shortAnswer);
        map.add("description", description);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(map, headers);

        String url;
        if ("EXERCISE".equals(quizType)) {
            url = "http://43.200.202.59:5000/aimodule/add-quiz-keyword";
        } else if ("PRACTICE".equals(quizType)) {
            url = "http://43.200.202.59:5000/aimodule/add-quiz-summary";
        } else {
            url = "http://43.200.202.59:5000/aimodule/add-quiz-keyword";
        }

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        // 필요하다면 응답 처리
        log.info("Status Code: {}", responseEntity.getStatusCode());
        log.info("Response Body: {}", responseEntity.getBody());
    }
}
