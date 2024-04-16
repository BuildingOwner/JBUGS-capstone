package jbugs.eclass.dto;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Notice;
import jbugs.eclass.domain.NoticeStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeDto {
    private Long noticeId;

    private String title;
    private String writer;
    private LocalDateTime createdAt;
    private int views;
    private NoticeStatus noticeStatus;
    private String content;


    public static NoticeDto from(Notice notice) {
        NoticeDto dto = new NoticeDto();
        dto.setNoticeId(notice.getId());
        dto.setTitle(notice.getTitle());
        dto.setWriter(notice.getWriter());
        dto.setCreatedAt(notice.getCreatedAt());
        dto.setNoticeStatus(notice.getNoticeStatus());
        dto.setViews(notice.getViews());
        dto.setContent(notice.getContent());
        return dto;
    }
}
