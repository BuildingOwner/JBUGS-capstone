package jbugs.eclass.dto;

import jbugs.eclass.domain.QuizStatus;
import jbugs.eclass.domain.QuizType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuizDetailsDto {
    private String quizName;
    private QuizType quizType; // String이 아닌 QuizType으로 수정
    private double averageScore;
    private int weekNumber;
    private long totalParticipants; // int에서 long으로 수정
    private LocalDateTime deadline;
    private QuizStatus quizStatus;
}
