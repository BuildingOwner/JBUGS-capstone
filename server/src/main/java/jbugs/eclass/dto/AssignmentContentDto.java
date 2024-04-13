package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class AssignmentContentDto {
    private MemberInfoDto memberInfoDto;
    private CourseDto courseDto;
    private List<AssignmentDto> assignmentDtoList;
}
