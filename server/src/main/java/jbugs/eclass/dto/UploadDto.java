package jbugs.eclass.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadDto {
    private String fileTitle;
    private String videoTitle;
    private int weekNumber;
    private MultipartFile[] attachFiles;
    private MultipartFile[] videoFiles;
    private String shortAnswer;
    private String choice;
    private String description;
    private String quizType;
}
