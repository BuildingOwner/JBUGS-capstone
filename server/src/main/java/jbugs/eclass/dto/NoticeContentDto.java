package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class NoticeContentDto {
    private MemberInfoDto memberInfoDto;
    private CourseDto courseDto;
    private List<NoticeDto> noticeDtoList;
}
