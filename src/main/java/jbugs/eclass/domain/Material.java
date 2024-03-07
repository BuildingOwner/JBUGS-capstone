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

    private String fileName; //제목
    private String filePath;
    private String videoName; //제목
    private String videoPath;

//    @OneToOne(cascade = CascadeType.ALL)
//    private UploadFile attachFile;
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<UploadFile> imageFiles = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;
}
