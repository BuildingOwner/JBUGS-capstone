//package jbugs.eclass.controller;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jbugs.eclass.argumentresolver.Login;
//import jbugs.eclass.domain.*;
//import jbugs.eclass.repository.EnrollmentRepository;
//import jbugs.eclass.repository.StudentRepository;
//import jbugs.eclass.service.EnrollmentService;
//import jbugs.eclass.service.MaterialService;
//import jbugs.eclass.service.WeekService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;
//
//@Slf4j
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/lib")
//public class UploadController {
//
//    private final StudentRepository studentRepository;
//    private final MaterialService materialService;
//    private final EnrollmentService enrollmentService;
//    private final EnrollmentRepository enrollmentRepository;
//    private final WeekService weekService;
//
//    @Value("${file.dir}")
//    private String fileDir;
//
//    public String getFullPath(String filename){
//        return fileDir + filename;
//    }
////    @GetMapping("/upload")
//    public String newFile(@Login Member loginMember, Model model) {
//        //세션에 회원 데이터가 없으면 home
//        if (loginMember == null) {
//            return "home";
//        }
//        model.addAttribute("member", loginMember);
//        Student student = studentRepository.findOne(loginMember.getStudent().getId());
//        List<Enrollment> enrollments = enrollmentService.findAllByStudentId(student.getId());
//        model.addAttribute("enrollment",enrollments);
//        List<Material> material = materialService.findMaterials();
//        model.addAttribute("material", material);
//        return "upload-form";
//    }
////    @PostMapping("/upload")
//    public String saveFile(@RequestParam String fileName, @RequestParam("enrollment") Long enrollmentId,
//                           @RequestParam("week") int weekNumber, @RequestParam("attachFile") MultipartFile[] attachFiles,
//                           @RequestParam("video") MultipartFile[] videoFiles, HttpServletRequest request) throws IOException {
//        Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);
//        Optional<Week> weekEntityOptional = weekService.findWeekByLectureAndWeekNumber(lecture.getId(), weekNumber);
//        if (weekEntityOptional.isPresent()) {
//            Week weekEntity = weekEntityOptional.get();
//
//            // 파일 처리
//            for (MultipartFile attachFile : attachFiles) {
//                if (!attachFile.isEmpty()) {
//                    String fullPath = fileDir + attachFile.getOriginalFilename();
//                    log.info("파일 저장 fullPath={}", fullPath);
//                    attachFile.transferTo(new File(fullPath));
//
//                    Material material = new Material();
//                    material.setFilePath(fullPath);
//                    material.setFileName(attachFile.getOriginalFilename());
//                    material.setWeek(weekEntity);
//
//                    materialService.join(material);
//                }
//            }
//
//            // 동영상 파일 처리
//            for (MultipartFile videoFile : videoFiles) {
//                if (videoFile != null && !videoFile.isEmpty()) {
//                    String fullVideoPath = fileDir + "/video/" + videoFile.getOriginalFilename();
//                    log.info("비디오 저장 fullVideoPath={}", fullVideoPath);
//                    videoFile.transferTo(new File(fullVideoPath));
//
//                    Material material2 = new Material();
////                    material2.setVideoPath(fullVideoPath);
////                    material2.setVideoName(videoFile.getOriginalFilename());
//                    material2.setWeek(weekEntity);
//
//                    materialService.join(material2);
//                }
//            }
//
//            // 파일 저장 후에 loginHome으로 리다이렉트
//            return "redirect:/";
//        } else {
//            // 주차 정보를 찾지 못한 경우에 대한 예외 처리
//            throw new RuntimeException("주차 정보를 찾을 수 없습니다.");
//        }
//
//    }
//
//
//
//}
