package jbugs.eclass.repository;

import jbugs.eclass.domain.VideoPlaybackTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoPlaybackTimeRepository extends JpaRepository<VideoPlaybackTime, Long> {
    Optional<VideoPlaybackTime> findByMemberIdAndVideoMaterialId(Long memberId, Long videoMaterialId);
}