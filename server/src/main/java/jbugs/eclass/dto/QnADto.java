package jbugs.eclass.dto;

import jbugs.eclass.domain.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class QnADto {
    private Long qnaId;

    private String title;
    private String writer;
    private LocalDateTime createdAt;
    private String content;
    private int views;
    private QnAStatus qnAStatus;
    private boolean secret;
    private String qnaAnswer;
    private List<MaterialDto> materials;

//    public static QnADto from(QnA qna) {
//        QnADto dto = new QnADto();
//        dto.setQnaId(qna.getId());
//        dto.setTitle(qna.getTitle());
//        dto.setContent(qna.getContent());
//        dto.setWriter(qna.getWriter());
//        dto.setCreatedAt(qna.getCreatedAt());
//        dto.setQnAStatus(qna.getQnaStatus());
//        dto.setViews(qna.getViews());
//        dto.setSecret(qna.isSecret());
//        dto.setQnaAnswer(qna.getQnaAnswer());
//        return dto;
//    }

    public static QnADto from(QnA qna, List<Material> materials) {
        QnADto dto = new QnADto();
        dto.setQnaId(qna.getId());
        dto.setTitle(qna.getTitle());
        dto.setContent(qna.getContent());
        dto.setWriter(qna.getWriter());
        dto.setCreatedAt(qna.getCreatedAt());
        dto.setQnAStatus(qna.getQnaStatus());
        dto.setViews(qna.getViews());
        dto.setSecret(qna.isSecret());
        dto.setQnaAnswer(qna.getQnaAnswer());

        // Material 리스트를 변환하여 설정
        List<MaterialDto> materialDtos = materials.stream().map(material -> {
            MaterialDto materialDto = new MaterialDto();
            materialDto.setMaterialId(material.getId());
            materialDto.setFileName(material.getFileName());
            materialDto.setFilePath(material.getFilePath());
            materialDto.setFileSize(material.getFileSize());
            return materialDto;
        }).collect(Collectors.toList());

        dto.setMaterials(materialDtos);
        return dto;
    }
}
