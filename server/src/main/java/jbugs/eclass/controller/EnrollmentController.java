package jbugs.eclass.controller;


import jbugs.eclass.domain.Enrollment;
import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Material;
import jbugs.eclass.domain.Week;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.service.EnrollmentService;
import jbugs.eclass.service.MaterialService;
import jbugs.eclass.service.WeekService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.UriUtils;

import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private final EnrollmentRepository enrollmentRepository;
    private final MaterialService materialService;
    private final WeekService weekService;
    private final UploadController uploadController;
    @GetMapping(value = "/{enrollmentId}/edit")
    public String classesForm(@PathVariable("enrollmentId") Long enrollmentId, Model model){
        Enrollment one = enrollmentService.findOne(enrollmentId);
        model.addAttribute("form", one);

        Lecture lecture = enrollmentRepository.findLectureByEnrollmentId(enrollmentId);

        List<Long> weekIds = weekService.findWeekIdsByLectureId(lecture.getId());
        Map<Integer, List<Material>> materialsByWeekNumber = new HashMap<>();

        for (Long weekId : weekIds) {
            Week week = weekService.findOne(weekId);
            if (week != null) {
                int weekNumber = week.getWeekNumber();
                List<Material> materialsForWeek = materialsByWeekNumber.getOrDefault(weekNumber, new ArrayList<>());

                List<Material> materials = materialService.findByWeekId(weekId);
                materialsForWeek.addAll(materials);

                materialsByWeekNumber.put(weekNumber, materialsForWeek);
            }
        }
        model.addAttribute("materialsByWeekNumber", materialsByWeekNumber);

        return "course";
    }

    @GetMapping("/{enrollmentId}/edit/download/{materialId}")
    public ResponseEntity<Resource> downloadAttach(@PathVariable Long enrollmentId, @PathVariable Long materialId)
            throws MalformedURLException {
        Material item = materialService.findOne(materialId);
        String uploadFileName = item.getFileName();
        UrlResource resource = new UrlResource("file:" + uploadController.getFullPath(uploadFileName));
        log.info("uploadFileName={}", uploadFileName);
        String encodedUploadFileName = UriUtils.encode(uploadFileName,
                StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(resource);
    }
}
