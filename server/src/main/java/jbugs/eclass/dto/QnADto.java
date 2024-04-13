package jbugs.eclass.dto;

import jbugs.eclass.domain.Notice;
import jbugs.eclass.domain.NoticeStatus;
import jbugs.eclass.domain.QnA;
import jbugs.eclass.domain.QnAStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QnADto {
    private Long qnaId;

    private String title;
    private String writer;
    private LocalDateTime createdAt;
    private int views;
    private QnAStatus qnAStatus;

    public static QnADto from(QnA qna) {
        QnADto dto = new QnADto();
        dto.setQnaId(qna.getId());
        dto.setTitle(qna.getTitle());
        dto.setWriter(qna.getWriter());
        dto.setCreatedAt(qna.getCreatedAt());
        dto.setQnAStatus(qna.getQnaStatus());
        dto.setViews(qna.getViews());
        return dto;
    }
}
