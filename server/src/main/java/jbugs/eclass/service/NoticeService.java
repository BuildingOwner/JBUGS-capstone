package jbugs.eclass.service;

import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Notice;
import jbugs.eclass.domain.NoticeStatus;
import jbugs.eclass.repository.LectureRepository;
import jbugs.eclass.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final LectureRepository lectureRepository;

    public void createNotice(Long lectureId, String title, String writer, LocalDateTime createdAt, int views, String content, NoticeStatus noticeStatus){
        Lecture lecture = lectureRepository.findOne(lectureId);
        if (lecture == null) {
            throw new IllegalArgumentException("강의 정보를 찾을 수 없습니다.");
        }

        Notice notice = new Notice();
        notice.setLecture(lecture);
        notice.setTitle(title);
        notice.setWriter(writer);
        notice.setCreatedAt(createdAt);
        notice.setViews(views);
        notice.setContent(content);
        notice.setNoticeStatus(noticeStatus);

        noticeRepository.save(notice);
    }
}
