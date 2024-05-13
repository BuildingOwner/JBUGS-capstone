package jbugs.eclass.dto;

import jbugs.eclass.domain.*;
import jbugs.eclass.service.MaterialService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AssignmentUploadDto {
    private String title;  // 과제 제목
    private String content; // 과제 내용
    private LocalDateTime dueDate; //제출 일자
    private String fileTitle;
    private int weekNumber;
    private MultipartFile[] attachFiles;

    public Assignment toEntity(Week week, Lecture lecture) throws IOException {
        Assignment assignment = new Assignment();
        assignment.setTitle(this.getTitle());
        assignment.setContent(this.getContent());
        assignment.setDueDate(this.getDueDate());
        assignment.setStatus(AssignmentStatus.NOT_SUBMITTED);
        assignment.setWeek(week);
        assignment.setLecture(lecture);

        return assignment;
    }
}
