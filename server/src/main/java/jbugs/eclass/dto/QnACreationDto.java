package jbugs.eclass.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class QnACreationDto {
    private String title;
    private String description; // QnA 설명
    private MultipartFile[] attachFiles; // 첨부 파일
}