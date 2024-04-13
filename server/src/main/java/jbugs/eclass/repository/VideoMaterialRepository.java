package jbugs.eclass.repository;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.VideoMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoMaterialRepository extends JpaRepository<VideoMaterial, Long> {
    List<VideoMaterial> findByWeekId(Long weekId);
}