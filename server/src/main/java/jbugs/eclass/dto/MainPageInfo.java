package jbugs.eclass.dto;

import lombok.Data;

import java.util.List;

@Data
public class MainPageInfo {
    private String name;
    private String firstTrack;
    private String lectureName;
    private String professorName;
    private String division;
    private String lectureTime;
    private String classification;
    private List<AssignmentDto> assignments;
}
