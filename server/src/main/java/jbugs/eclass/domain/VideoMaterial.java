package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VideoMaterial {
    @Id
    @GeneratedValue
    @Column(name = "video_material_id")
    private Long id;

    private String videoName; //제목
    private String videoPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;
}
