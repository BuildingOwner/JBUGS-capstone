package jbugs.eclass.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AssignmentDto {
    private Long id;
    private String title;
    private LocalDateTime dueDate;
    private Long weekId;
}
