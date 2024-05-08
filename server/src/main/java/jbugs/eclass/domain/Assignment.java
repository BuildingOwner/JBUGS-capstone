package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    private String title;  // 과제 제목
    private String content; // 과제 내용
    private LocalDateTime dueDate; //제출 일자

    @Enumerated(EnumType.STRING)
    private AssignmentStatus status;  // 과제 상태

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL)
    private List<Material> materials = new ArrayList<>();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "lecture_id")
//    private Lecture lecture;
}
