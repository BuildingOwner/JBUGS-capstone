package jbugs.eclass.service;

import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.QuizInfo;
import jbugs.eclass.dto.QuizDetailsDto;
import jbugs.eclass.dto.QuizDto;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuizInfoRepository quizInfoRepository;
    private final WeekRepository weekRepository;

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

    // QuizService.java
    public List<QuizDto> findQuizzesByWeekIdAndStudentId(Long weekId, Long studentId) {
        List<Quiz> quizzes = quizRepository.findQuizzesByWeekId(weekId);
        return quizzes.stream().map(quiz -> {
            Optional<QuizInfo> quizInfoOptional = quizInfoRepository.findByQuizIdAndStudentId(quiz.getId(), studentId);
            // QuizInfo가 존재한다면, 해당 정보를 포함하여 QuizDto 생성
            return quizInfoOptional.map(quizInfo -> QuizDto.from(quiz, quizInfo)).orElse(null);
        }).collect(Collectors.toList());
    }
}