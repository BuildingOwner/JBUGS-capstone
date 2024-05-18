package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Quiz;
import jbugs.eclass.domain.Week;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeekRepository extends JpaRepository<Week, Long> {

    // 이 메소드는 Spring Data JPA가 자동으로 구현해줍니다.
    Optional<Week> findById(Long id);

    Optional<Week> findByLectureIdAndWeekNumber(Long lectureId, int weekNumber);

    // lecture의 id를 기준으로 모든 Week을 찾습니다.
    List<Week> findByLectureId(Long lectureId);
}
