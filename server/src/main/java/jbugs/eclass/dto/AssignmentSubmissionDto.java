package jbugs.eclass.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AssignmentSubmissionDto {
    private String content; // 과제 제출 내용
    private MultipartFile[] attachFiles; // 제출 파일
}