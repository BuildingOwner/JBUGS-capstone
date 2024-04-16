package jbugs.eclass.dto;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.AssignmentStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AssignmentDto {
    private Long id;
    private String title;
    private String contents;
    private LocalDateTime dueDate;
    private Long weekId;
    private AssignmentStatus status;

    public static AssignmentDto from(Assignment assignment) {
        AssignmentDto dto = new AssignmentDto();
        dto.setId(assignment.getId());
        dto.setTitle(assignment.getTitle());
        dto.setContents(assignment.getContent());
        dto.setDueDate(assignment.getDueDate());
        dto.setWeekId(assignment.getWeek().getId());
        dto.setStatus(assignment.getStatus());
        return dto;
    }
}
