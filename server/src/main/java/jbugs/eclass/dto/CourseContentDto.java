package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseContentDto {
    private MemberInfoDto memberInfoDto;
    private CourseDto courseDto;
    private List<WeeklyContentDto> weeklyContents;
//    private TestDto testDto;
}
