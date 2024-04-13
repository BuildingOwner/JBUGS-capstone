package jbugs.eclass.repository;

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
}
