package jbugs.eclass.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AnswerRequestDto {
    private Long studentId;
    private Long quizId;
    private Map<Integer, String> answers;
}
