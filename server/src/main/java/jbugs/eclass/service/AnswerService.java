package jbugs.eclass.service;

import jbugs.eclass.domain.Answer;
import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.Student;
import jbugs.eclass.dto.AnswerRequestDto;
import jbugs.eclass.repository.AnswerRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuizRepository quizRepository;
    private final StudentRepository studentRepository;

    // Constructor 생략

    public void saveAnswers(AnswerRequestDto answerRequestDTO) {
        Quiz quiz = quizRepository.findById(answerRequestDTO.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        Student student = studentRepository.findOne(answerRequestDTO.getStudentId());

        Answer answer = new Answer();
        answer.setQuiz(quiz);
        answer.setStudent(student);
        answer.setAnswers(answerRequestDTO.getAnswers());

        answerRepository.save(answer);
    }
}

