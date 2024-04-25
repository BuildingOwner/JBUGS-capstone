package jbugs.eclass.dto;

import jbugs.eclass.domain.QuizType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizEditDto {
    private Long quizId;

    private QuizType quizType;
    private String quizName;
    private String description;
    private LocalDateTime deadline; // 종료일시
    private boolean submissionStatus;
    private Integer quizScore;
}
