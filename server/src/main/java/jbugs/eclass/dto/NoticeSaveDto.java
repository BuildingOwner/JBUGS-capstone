package jbugs.eclass.dto;

import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Notice;
import jbugs.eclass.domain.NoticeStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NoticeSaveDto {
    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private NoticeStatus noticeStatus; // 공지 구분

    public Notice toEntity(Lecture lecture) {
        Notice notice = new Notice();
        notice.setTitle(this.title);
        notice.setWriter(this.writer);
        notice.setContent(this.content);
        notice.setCreatedAt(LocalDateTime.now()); // 생성 시간은 현재 시간으로 설정
        notice.setViews(0); // 조회수는 0으로 초기화
        notice.setNoticeStatus(this.noticeStatus); // NoticeSaveDto에서 받은 공지 구분
        notice.setLecture(lecture); // 메서드 인자로 받은 Lecture 객체 설정
        return notice;
    }
}