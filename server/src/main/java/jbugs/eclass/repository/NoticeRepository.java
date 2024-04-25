package jbugs.eclass.repository;

import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findNoticesByLecture(Lecture lecture);
}