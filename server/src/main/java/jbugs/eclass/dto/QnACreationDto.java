package jbugs.eclass.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class QnACreationDto {
    private String title;
    private String description; // QnA 설명
    private boolean secret;
    private MultipartFile[] attachFiles = new MultipartFile[0]; // 첨부 파일
}