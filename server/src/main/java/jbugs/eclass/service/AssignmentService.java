package jbugs.eclass.service;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.AssignmentStatus;
import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Week;
import jbugs.eclass.dto.AssignmentDto;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final WeekService weekService;

    public void createAssignment(Lecture lecture,Long weekId, String title, String content, LocalDateTime dueDate, AssignmentStatus status) {
        Week week = weekService.findOne(weekId);
        if (week == null) {
            throw new IllegalArgumentException("주차 정보를 찾을 수 없습니다.");
        }

        Assignment assignment = new Assignment();
        assignment.setWeek(week);
        assignment.setTitle(title);
        assignment.setContent(content);
        assignment.setDueDate(dueDate);
        assignment.setStatus(status);
        assignment.setLecture(lecture);

        assignmentRepository.save(assignment);
    }

    public List<AssignmentDto> findAssignmentsByLecture(Long lectureId) {
        // Repository를 통해 LectureId에 해당하는 과제 목록을 조회
        List<Assignment> assignments = assignmentRepository.findByLectureId(lectureId);

        // Assignment 엔티티 목록을 AssignmentDto 목록으로 변환
        List<AssignmentDto> assignmentDtos = assignments.stream()
                .map(assignment -> {
                    AssignmentDto dto = new AssignmentDto();
                    dto.setId(assignment.getId());
                    dto.setTitle(assignment.getTitle());
                    dto.setContents(assignment.getContent());
                    dto.setDueDate(assignment.getDueDate());
                    dto.setStatus(assignment.getStatus());
                    dto.setWeekNumber(assignment.getWeek().getWeekNumber());

                    return dto;
                }).collect(Collectors.toList());

        return assignmentDtos;
    }



    public List<AssignmentDto> findAssignmentsByWeekIdAndLectureId(Long weekId, Long lectureId) {
        List<Assignment> assignments = assignmentRepository.findAssignmentsByWeekIdAndLectureId(weekId, lectureId);

        // Assignment 엔티티 목록을 AssignmentDto 목록으로 변환
        List<AssignmentDto> assignmentDtos = assignments.stream().map(assignment -> {
            AssignmentDto dto = new AssignmentDto();
            dto.setId(assignment.getId());
            dto.setTitle(assignment.getTitle());
            dto.setContents(assignment.getContent());
            dto.setDueDate(assignment.getDueDate());
            dto.setStatus(assignment.getStatus());

            return dto;
        }).collect(Collectors.toList());

        return assignmentDtos;
    }
}
