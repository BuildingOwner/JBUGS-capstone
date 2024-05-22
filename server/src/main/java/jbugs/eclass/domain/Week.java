package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Week {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "week_id")
    private Long id;

    private int weekNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    private List<Material> materials = new ArrayList<>();

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    private List<VideoMaterial> videoMaterials = new ArrayList<>();

//    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
//    private List<Attendance> attendances = new ArrayList<>();

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    private List<Assignment> assignments = new ArrayList<>();

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    private List<Quiz> quizzes = new ArrayList<>();

    public Week() {
    }

    // Builder 패턴을 사용하여 Week 객체를 생성하고 주차 정보를 설정
    public static Week build(int weekNumber) {
        Week week = new Week();
        week.setWeekNumber(weekNumber);
        return week;
    }
}
