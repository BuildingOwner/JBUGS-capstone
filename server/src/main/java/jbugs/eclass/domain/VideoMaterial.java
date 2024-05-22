package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class VideoMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_material_id")
    private Long id;

    private String title;
    private String videoName; //제목
    private String videoPath;
    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @OneToMany(mappedBy = "videoMaterial", cascade = CascadeType.ALL)
    private List<VideoPlaybackTime> videoPlaybackTimes = new ArrayList<>();
}

