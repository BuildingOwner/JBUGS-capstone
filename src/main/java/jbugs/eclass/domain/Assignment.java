package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Assignment {
    @Id
    @GeneratedValue
    @Column(name = "assignment_id")
    private Long id;

    private int week;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
