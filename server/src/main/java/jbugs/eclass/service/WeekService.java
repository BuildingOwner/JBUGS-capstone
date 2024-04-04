package jbugs.eclass.service;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Week;
import jbugs.eclass.dto.MainPageInfo;
import jbugs.eclass.repository.AssignmentRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WeekService {
    private final WeekRepository weekRepository;
    private final AssignmentRepository assignmentRepository;

    @Transactional
    public Optional<Week> findWeekByLectureAndWeekNumber(Long lectureId, int weekNumber) {
        return weekRepository.findByLectureIdAndWeekNumber(lectureId, weekNumber);
    }

    @Transactional
    public void save(Week week){
        weekRepository.save(week);
    }

    public List<Week> findWeeks(){
        return weekRepository.findAll();
    }

    public Week findOne(Long weekId){
        return weekRepository.findOne(weekId);
    }

    public List<Assignment> findAssignmentsByLectureId(Long lectureId) {
        // lectureId에 해당하는 모든 weekId를 찾음
        List<Long> weekIds = findWeekIdsByLectureId(lectureId);

        // weekId에 해당하는 모든 assignment를 찾음
        List<Assignment> assignments = weekIds.stream()
                .map(this::findAssignmentsByWeekId)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        return assignments;
    }

    public List<Long> findWeekIdsByLectureId(Long lectureId) {
        return weekRepository.findByLectureId(lectureId)
                .stream()
                .map(Week::getId)
                .collect(Collectors.toList());
    }

    private List<Assignment> findAssignmentsByWeekId(Long weekId) {
        return assignmentRepository.findByWeekId(weekId);
    }



    public List<Assignment> findValidAssignmentsByLectureId(Long lectureId) {
        List<Assignment> allAssignments = findAssignmentsByLectureId(lectureId);

        // 현재 날짜와 제출 일자를 비교하여 과제 기간이 지나지 않은 과제만 필터링하여 반환
        return allAssignments.stream()
                .filter(assignment -> isAssignmentValid(assignment))
                .collect(Collectors.toList());
    }

    private boolean isAssignmentValid(Assignment assignment) {
        LocalDateTime dueDate = assignment.getDueDate();
        LocalDateTime currentDate = LocalDateTime.now();
        // 현재 날짜와 제출 일자를 비교하여 과제 기간이 지났는지 확인
        return currentDate.isBefore(dueDate);  // 현재 날짜가 제출 일자 이전이면 유효한 과제로 처리
    }

}
