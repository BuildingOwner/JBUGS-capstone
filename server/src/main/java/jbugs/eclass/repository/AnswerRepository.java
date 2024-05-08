package jbugs.eclass.repository;

import jbugs.eclass.domain.Answer;
import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.Student;
import jbugs.eclass.dto.AnswerDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Answer findByQuizAndStudent(Quiz quiz, Student student);

    Optional<Answer> findByQuizIdAndStudentId(Long quizId, Long studentId);

    @Query("SELECT new jbugs.eclass.dto.AnswerDto(a.quiz.id, qi.quizScore, a.answers) " +
            "FROM Answer a JOIN a.quiz q JOIN q.quizInfos qi " + // quizInfo를 quizInfos로 수정
            "WHERE a.quiz.id = :quizId AND a.student.id = :studentId")
    Optional<AnswerDto> findAnswerDtoByQuizIdAndStudentId(@Param("quizId") Long quizId, @Param("studentId") Long studentId);

}
