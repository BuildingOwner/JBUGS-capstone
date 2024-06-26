package jbugs.eclass.service;

import jbugs.eclass.domain.*;
import jbugs.eclass.repository.*;
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
    private final VideoMaterialRepository videoMaterialRepository;
    private final MaterialRepository materialRepository;
    private final QuizRepository quizRepository;
    private final QuizInfoRepository quizInfoRepository;

    @Transactional
    public Optional<Week> findWeekByLectureAndWeekNumber(Long lectureId, int weekNumber) {
        return weekRepository.findByLectureIdAndWeekNumber(lectureId, weekNumber);
    }

    @Transactional
    public void save(Week week){
        weekRepository.save(week);
    }

    public Week findOne(Long weekId) {
        Optional<Week> week = weekRepository.findById(weekId);
        return week.orElseThrow(() -> new IllegalArgumentException("해당 주차 정보를 찾을 수 없습니다: " + weekId));
        // Optional 객체의 orElseThrow 메소드를 사용하여 Week 객체를 찾을 수 없는 경우 예외를 발생시킵니다.
    }

    public List<Week> findWeeks(){
        return weekRepository.findAll();
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



    public List<Quiz> findQuizByLectureId(Long lectureId) {
        // lectureId에 해당하는 모든 weekId를 찾음
        List<Long> weekIds = findWeekIdsByLectureId(lectureId);

        List<Quiz> quizzes = weekIds.stream()
                .map(this::findQuizByWeekId)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        return quizzes;
    }

    public List<Week> findWeeksByLectureId(Long lectureId) {
        return weekRepository.findByLectureId(lectureId);
    }

    public List<Long> findWeekIdsByLectureId(Long lectureId) {
        return weekRepository.findByLectureId(lectureId)
                .stream()
                .map(Week::getId)
                .collect(Collectors.toList());
    }

    public List<Assignment> findAssignmentsByWeekId(Long weekId) {
        return assignmentRepository.findByWeekId(weekId);
    }

    public List<Quiz> findQuizByWeekId(Long weekId) {
        return quizRepository.findByWeekId(weekId);
    }

    public List<VideoMaterial> findVideoMaterialsByWeekId(Long weekId) {
        return videoMaterialRepository.findByWeekId(weekId);
    }

    public List<Material> findMaterialsByWeekId(Long weekId) {
        return materialRepository.findByWeekId(weekId);
    }

    public List<Quiz> findQuizzesByWeekId(Long weekId) {
        return quizRepository.findByWeekId(weekId);
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

    public Optional<Week> findWeekById(Long weekId) {
        return weekRepository.findById(weekId);
    }

}
