package jbugs.eclass.dto;

import jbugs.eclass.domain.*;
import jbugs.eclass.service.MaterialService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Data
public class AssignmentUploadDto {

    private MaterialService materialService;

    @Value("${file.dir}")
    private String fileDir;

    private String title;  // 과제 제목
    private String content; // 과제 내용
    private LocalDateTime dueDate; //제출 일자
    private String fileTitle;
    private int weekNumber;
    private MultipartFile[] attachFiles;

    public Assignment toEntity(Week week) throws IOException {
        Assignment assignment = new Assignment();
        assignment.setTitle(this.getTitle());
        assignment.setContent(this.getContent());
        assignment.setDueDate(this.getDueDate());
        assignment.setStatus(AssignmentStatus.NOT_SUBMITTED);
        assignment.setWeek(week);

        if (attachFiles != null) {
            for (MultipartFile file : attachFiles) {
                if (!file.isEmpty()) {
                    String fullPath = fileDir + file.getOriginalFilename(); // 파일 저장 경로
                    file.transferTo(new File(fullPath)); // 파일 저장

                    Material material = new Material();
                    material.setFilePath(fullPath);
                    material.setFileName(file.getOriginalFilename()); // 파일명 설정
                    material.setWeek(week);
                    material.setAssignment(assignment);
                    materialService.join(material); // Material 저장
                }
            }
        }
        return assignment;
    }
}
