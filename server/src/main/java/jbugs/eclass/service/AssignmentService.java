package jbugs.eclass.service;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.AssignmentStatus;
import jbugs.eclass.domain.Week;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final WeekRepository weekRepository;

    public void createAssignment(Long weekId, String title, String content, LocalDateTime dueDate) {
        Week week = weekRepository.findOne(weekId);
        if (week == null) {
            throw new IllegalArgumentException("주차 정보를 찾을 수 없습니다.");
        }

        Assignment assignment = new Assignment();
        assignment.setWeek(week);
        assignment.setTitle(title);
        assignment.setContent(content);
        assignment.setDueDate(dueDate);
        assignment.setStatus(AssignmentStatus.NOT_SUBMITTED);

        assignmentRepository.save(assignment);
    }

}
