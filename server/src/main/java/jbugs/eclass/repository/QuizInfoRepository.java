package jbugs.eclass.repository;

import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.QuizInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizInfoRepository extends JpaRepository<QuizInfo, Long> {
    Optional<QuizInfo> findByQuizId(Long quizId);

    Optional<QuizInfo> findByQuiz(Quiz quiz);

    Optional<QuizInfo> findByQuizIdAndStudentId(Long id, Long studentId);

    List<QuizInfo> findBySubmissionStatusAndQuiz_LectureIdAndStudentId(boolean submissionStatus, Long lectureId, Long studentId);
}