package jbugs.eclass.repository;

import jbugs.eclass.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByWeekId(Long weekId);

    List<Assignment> findByLectureId(Long lectureId);

    Optional<Assignment> findByWeekLectureIdAndDueDateAfter(Long weekLectureId, LocalDateTime dueDate);

    @Query("SELECT a FROM Assignment a WHERE a.week.id = :weekId AND a.lecture.id = :lectureId")
    List<Assignment> findAssignmentsByWeekIdAndLectureId(Long weekId, Long lectureId);
}