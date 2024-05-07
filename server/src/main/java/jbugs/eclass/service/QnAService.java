package jbugs.eclass.service;

import jbugs.eclass.domain.*;
import jbugs.eclass.repository.LectureRepository;
import jbugs.eclass.repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class QnAService {
    private final QnARepository qnARepository;
    private final LectureRepository lectureRepository;

    public void createQnA(Long lectureId, String title, String writer, LocalDateTime createdAt, int views, String content, QnAStatus qnAStatus){
        Lecture lecture = lectureRepository.findOne(lectureId);
        if (lecture == null) {
            throw new IllegalArgumentException("강의 정보를 찾을 수 없습니다.");
        }

        QnA qna = new QnA();
        qna.setLecture(lecture);
        qna.setTitle(title);
        qna.setWriter(writer);
        qna.setCreatedAt(createdAt);
        qna.setViews(views);
        qna.setContent(content);
        qna.setQnaStatus(qnAStatus);

        qnARepository.save(qna);
    }
}
