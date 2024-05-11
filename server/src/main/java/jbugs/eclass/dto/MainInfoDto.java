package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class MainInfoDto {
    private MemberInfoDto memberInfoDto;
    private List<MainLectureDto> mainLectures;
    private List<QuizDto> quizDtoList;
}
