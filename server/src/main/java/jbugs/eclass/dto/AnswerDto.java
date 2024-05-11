package jbugs.eclass.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AnswerDto {
    private Long studentId;
    private Long quizId;
    private Integer quizScore;
    private Map<String, String> answers;

    public AnswerDto(Long quizId, Integer quizScore, Map<String, String> answers) {
        this.quizId = quizId;
        this.quizScore = quizScore;
        this.answers = answers;
    }
}
