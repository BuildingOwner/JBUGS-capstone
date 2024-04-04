package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class MainPageInfo {
    private String lectureName;
    private String professorName;
    private String division;
    private List<AssignmentDto> assignments;
}
