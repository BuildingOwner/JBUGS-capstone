package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizContentDto {
    private MemberInfoDto memberInfoDto;
    private CourseDto courseDto;
    private List<QuizDto> allQuizDtoList;
}
