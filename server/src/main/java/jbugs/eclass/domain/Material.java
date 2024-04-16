package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Material {

    @Id
    @GeneratedValue
    @Column(name = "material_id")
    private Long id;

    private String title;
    private String fileName; //제목
    private String filePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_id")
    private QnA qna;
}
