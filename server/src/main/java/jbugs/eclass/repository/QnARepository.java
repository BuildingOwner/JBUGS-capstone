package jbugs.eclass.repository;

import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findQnAsByLecture(Lecture lecture);
}