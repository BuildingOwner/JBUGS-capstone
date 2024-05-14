package jbugs.eclass.repository;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByWeekId(Long weekId);

    // @Query 어노테이션을 사용하여 커스텀 쿼리 작성
    @Query("SELECT m FROM Material m WHERE m.week.id IN :weekIds")
    List<Material> findByWeekIds(@Param("weekIds") List<Long> weekIds);

    List<Material> findByAssignment(Assignment assignment);

//    @Query("SELECT m FROM Material m WHERE m.week.id = :weekId AND m.lecture.id = :lectureId")
    List<Material> findByWeekIdAndLectureId(Long weekId, Long lectureId);

    @Query("SELECT m FROM Material m WHERE m.week.id = :weekId AND m.lecture.id = :lectureId")
    List<Material> findMaterialsByWeekIdAndLectureId(Long weekId, Long lectureId);

    List<Material> findByLectureId(Long lectureId);
}
