package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerContentDto {
    private MemberInfoDto memberInfoDto;
    private StudentDto studentDto;
    private AnswerDto answerDto;
}
