package jbugs.eclass.service;

import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.QuizInfo;
import jbugs.eclass.domain.Student;
import jbugs.eclass.dto.QuizDetailsDto;
import jbugs.eclass.dto.QuizDto;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.QuizRepository;
import jbugs.eclass.repository.StudentRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuizInfoRepository quizInfoRepository;
    private final WeekRepository weekRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public void saveQuiz(Quiz quiz){
        quizRepository.save(quiz);
    }

    @Transactional(readOnly = false)
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

    public List<QuizDto> findQuizzesByWeekIdAndStudentId(Long weekId, Long studentId) {
        List<Quiz> quizzes = quizRepository.findQuizzesByWeekId(weekId);
        return quizzes.stream().map(quiz -> {
            Optional<QuizInfo> quizInfoOptional = quizInfoRepository.findByQuizIdAndStudentId(quiz.getId(), studentId);
            // QuizInfo가 존재하지 않는다면, 기본값을 가지는 새로운 QuizInfo를 생성
            QuizInfo quizInfo = quizInfoOptional.orElseGet(() -> {
                QuizInfo newQuizInfo = createDefaultQuizInfo(quiz.getId(), studentId);
                return quizInfoRepository.save(newQuizInfo); // 데이터베이스에 저장
            });
            // 항상 QuizInfo를 포함하여 QuizDto 생성
            return QuizDto.from(quiz, quizInfo);
        }).collect(Collectors.toList());
    }

    // 기본값을 가지는 QuizInfo 객체를 생성하는 메소드
    private QuizInfo createDefaultQuizInfo(Long quizId, Long studentId) {
        QuizInfo quizInfo = new QuizInfo();
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + quizId));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + studentId));
        quizInfo.setQuiz(quiz);
        quizInfo.setStudent(student);
        quizInfo.setQuizScore(0);
        quizInfo.setSubmissionStatus(false);
        saveQuizInfo(quizInfo);
        return quizInfo;
    }
}