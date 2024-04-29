package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChatContentDto {
    private MemberInfoDto memberInfoDto;
    private StudentDto studentDto;
    private List<ChatDto> chatDtoList;
}
