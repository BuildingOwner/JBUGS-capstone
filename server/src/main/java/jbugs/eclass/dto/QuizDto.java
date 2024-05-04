package jbugs.eclass.dto;

import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.QuizInfo;
import jbugs.eclass.domain.QuizType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizDto {
    private Long quizId;

    private QuizType quizType;
    private String quizName;
    private String description;
    private String jsonData;
    private LocalDateTime deadline; // 종료일시
    private boolean submissionStatus;
    private Integer quizScore;
    private String timeLimit; // 제한시간
    private String reflectionRatio; //반영비율
    private int week;

    public static QuizDto from(Quiz quiz, QuizInfo quizInfo) {
        QuizDto dto = new QuizDto();
        dto.setQuizId(quiz.getId());
        dto.setQuizType(quiz.getQuizType());
        dto.setDescription(quiz.getDescription());
        dto.setQuizName(quiz.getQuizName());
        dto.setDeadline(quiz.getDeadline());
        dto.setTimeLimit(quiz.getTimeLimit());
        dto.setReflectionRatio(quiz.getReflectionRatio());
        dto.setWeek(quiz.getWeek().getWeekNumber());
//        dto.setJsonData(quiz.getJsonData());

        if (quizInfo != null) { // QuizInfo 객체가 제공되는 경우에만
            dto.setSubmissionStatus(quizInfo.isSubmissionStatus());
            dto.setQuizScore(quizInfo.getQuizScore());
        }

        return dto;
    }
}
