package jbugs.eclass.repository;

import jbugs.eclass.domain.Assignment;
import jbugs.eclass.domain.VideoMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoMaterialRepository extends JpaRepository<VideoMaterial, Long> {
    List<VideoMaterial> findByWeekId(Long weekId);

    @Query("SELECT v FROM VideoMaterial v WHERE v.week.id = :weekId AND v.lecture.id = :lectureId")
    List<VideoMaterial> findVideoMaterialsByWeekIdAndLectureId(Long weekId, Long lectureId);

    List<VideoMaterial> findByLectureId(Long lectureId);

    List<VideoMaterial> findByWeekIdAndLectureId(Long weekId, Long lectureId);
}