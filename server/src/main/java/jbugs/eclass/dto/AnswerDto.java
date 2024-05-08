package jbugs.eclass.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AnswerDto {
    private Long quizId;
    private int score;
    private Map<String, String> answers;
}