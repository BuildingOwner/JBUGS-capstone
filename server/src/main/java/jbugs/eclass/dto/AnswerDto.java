package jbugs.eclass.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AnswerDto {
    private Long studentId;
    private Long quizId;
    private Integer score;
    private Map<String, String> answers;
}
