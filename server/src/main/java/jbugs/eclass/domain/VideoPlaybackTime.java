package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VideoPlaybackTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_playback_time_id")
    private Long id;

    private Long playbackTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_material_id")
    private VideoMaterial videoMaterial; // 관련 비디오 자료

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}