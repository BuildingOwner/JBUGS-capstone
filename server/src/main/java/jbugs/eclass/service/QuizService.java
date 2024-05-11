package jbugs.eclass.service;

import jbugs.eclass.domain.*;
import jbugs.eclass.dto.QuizDetailsDto;
import jbugs.eclass.dto.QuizDto;
import jbugs.eclass.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuizInfoRepository quizInfoRepository;
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

    public List<QuizDto> findQuizzesByWeekIdAndStudentId(Long weekId, Long studentId, Enrollment enrollment) {
        List<Quiz> quizzes = quizRepository.findQuizzesByWeekId(weekId);

        return quizzes.stream().map(quiz -> {
            Optional<QuizInfo> quizInfoOptional = quizInfoRepository.findByQuizIdAndStudentId(quiz.getId(), studentId);
            // QuizInfo가 존재하지 않는다면, 기본값을 가지는 새로운 QuizInfo를 생성
            QuizInfo quizInfo = quizInfoOptional.orElseGet(() -> {
                QuizInfo newQuizInfo = createDefaultQuizInfo(quiz.getId(), studentId, enrollment);
                return quizInfoRepository.save(newQuizInfo); // 데이터베이스에 저장
            });
            // 항상 QuizInfo를 포함하여 QuizDto 생성
            return QuizDto.from(quiz, quizInfo);
        }).collect(Collectors.toList());
    }

    // 기본값을 가지는 QuizInfo 객체를 생성하는 메소드
    public QuizInfo createDefaultQuizInfo(Long quizId, Long studentId, Enrollment enrollment) {
        QuizInfo quizInfo = new QuizInfo();
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + quizId));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + studentId));
        quizInfo.setQuiz(quiz);
        quizInfo.setStudent(student);
        quizInfo.setEnrollment(enrollment);
        quizInfo.setQuizScore(0);
        quizInfo.setSubmissionStatus(false);
        saveQuizInfo(quizInfo);
        return quizInfo;
    }

    public List<QuizDto> findUnsubmittedQuizzesByLectureAndStudent(Long lectureId, Long studentId, Enrollment enrollment) {
        // 특정 강의에 속한 모든 퀴즈 조회
        List<Quiz> quizzes = quizRepository.findByLectureId(lectureId);

        List<QuizDto> quizDtos = new ArrayList<>();
        for (Quiz quiz : quizzes) {
            Optional<QuizInfo> quizInfoOptional = quizInfoRepository.findByQuizIdAndStudentId(quiz.getId(), studentId);

            // QuizInfo가 존재하지 않거나 제출하지 않은 경우, 기본값을 가지는 새로운 QuizInfo를 생성
            QuizInfo quizInfo = quizInfoOptional.orElseGet(() -> {
                // createDefaultQuizInfo 메소드를 이용하여 기본값을 가지는 QuizInfo 객체 생성
                return createDefaultQuizInfo(quiz.getId(), studentId, enrollment); // 데이터베이스에 저장
            });

            // 항상 QuizInfo를 포함하여 QuizDto 생성
            QuizDto quizDto = QuizDto.from(quiz, quizInfo);
            quizDtos.add(quizDto);
        }

        return quizDtos;
    }
}