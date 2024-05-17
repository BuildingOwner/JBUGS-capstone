package jbugs.eclass.dto;

import jbugs.eclass.domain.QuizType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizDto2 {
    private Long quizId;
    private Long lectureId;
    private QuizType quizType;
    private String quizName;
    private String description;
    private LocalDateTime deadline; // 종료일시
    private String timeLimit; // 제한시간
    private int week;
}
