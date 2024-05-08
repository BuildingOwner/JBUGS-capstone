package jbugs.eclass.repository;

import jbugs.eclass.domain.Answer;
import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Answer findByQuizAndStudent(Quiz quiz, Student student);
}
