package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class QnAContentDto {
    private MemberInfoDto memberInfoDto;
    private CourseDto courseDto;
    private List<QnADto> qnADtoList;
}
