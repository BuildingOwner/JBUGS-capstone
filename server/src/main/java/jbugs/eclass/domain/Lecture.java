package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Lecture {
    @Id
    @GeneratedValue
    @Column(name = "lecture_id")
    private Long id;

    private String name;  // 강의 이름
    private String division; // 분반
    private String classification; //강좌 이수구분
    private String lectureTime; //강의 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    private List<Week> weeks = new ArrayList<>();

    public Lecture() {
    }

    // 강좌 추가 메서드
    public void addEnrollment(Enrollment enrollment) {
        enrollments.add(enrollment);
        enrollment.setLecture(this);
    }

    // 강좌 삭제 메서드
    public void removeEnrollment(Enrollment enrollment) {
        enrollments.remove(enrollment);
        enrollment.setLecture(null);
    }


}
