package jbugs.eclass.service;

import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.QuizInfo;
import jbugs.eclass.dto.QuizDetailsDto;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuizInfoRepository quizInfoRepository;

    @Transactional
    public void saveQuiz(Quiz quiz){
        quizRepository.save(quiz);
    }

    @Transactional
    public void saveQuizInfo(QuizInfo quizInfo){
        quizInfoRepository.save(quizInfo);
    }

    public List<Quiz> findQuizzes() {
        return quizRepository.findAll();
    }

    public QuizInfo findQuizInfoByQuizId(Long quizId) {
        return quizInfoRepository.findByQuizId(quizId)
                .orElseThrow(() -> new IllegalArgumentException("QuizInfo not found for quizId: " + quizId));
    }

    public Optional<QuizDetailsDto> getQuizDetails(Long quizId) {
        return quizRepository.findQuizDetailsById(quizId);
    }
}