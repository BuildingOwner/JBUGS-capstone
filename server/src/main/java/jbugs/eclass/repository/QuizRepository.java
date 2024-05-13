package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.VideoMaterial;
import jbugs.eclass.dto.QuizDetailsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByWeekId(Long weekId);

    @Query("SELECT new jbugs.eclass.dto.QuizDetailsDto(q.quizName, q.quizType, AVG(qi.quizScore), w.weekNumber, COUNT(qi.quizScore), q.deadline, q.quizStatus) FROM Quiz q JOIN q.week w JOIN q.quizInfos qi WHERE q.id = :quizId GROUP BY q.id")
    Optional<QuizDetailsDto> findQuizDetailsById(@Param("quizId") Long quizId);

    List<Quiz> findQuizzesByWeekId(Long weekId);

    List<Quiz> findByLectureId(Long lectureId);

    @Query("SELECT q FROM Quiz q LEFT JOIN FETCH q.quizInfos qi WHERE q.week = :weekId AND qi.student.id = :studentId")
    List<Quiz> findQuizzesWithQuizInfoByWeekIdAndStudentId(@Param("weekId") Long weekId, @Param("studentId") Long studentId);

    // QuizRepository.java에 추가
    @Query("SELECT q FROM Quiz q LEFT JOIN FETCH q.quizInfos qi WHERE q.lecture.id = :lectureId AND qi.student.id = :studentId AND qi.submissionStatus = false")
    List<Quiz> findUnsubmittedQuizzesWithQuizInfoByLectureIdAndStudentId(@Param("lectureId") Long lectureId, @Param("studentId") Long studentId);

}
