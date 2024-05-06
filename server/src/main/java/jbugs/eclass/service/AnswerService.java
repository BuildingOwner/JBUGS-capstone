package jbugs.eclass.service;

import jbugs.eclass.domain.*;
import jbugs.eclass.dto.AnswerRequestDto;
import jbugs.eclass.repository.AnswerRepository;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuizRepository quizRepository;
    private final StudentRepository studentRepository;
    private final QuizInfoRepository quizInfoRepository;

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

        updateQuizInfo(quiz, answerRequestDTO.getScore());
    }
    private void updateQuizInfo(Quiz quiz, int score) {
        QuizInfo quizInfo = quizInfoRepository.findByQuiz(quiz)
                .orElseThrow(() -> new RuntimeException("QuizInfo not found"));
        quizInfo.setQuizScore(score);
        quizInfo.setSubmissionStatus(true); // ENUM 타입인 QuizStatus.SUBMIT을 사용
        quizInfo.setSubmittedAt(LocalDateTime.now());

        quizInfoRepository.save(quizInfo);
    }
}

