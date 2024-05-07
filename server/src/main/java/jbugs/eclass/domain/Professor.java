package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "professor_id")
    private Long id;

    private String major;
    private String email;
    private String lab;

    @OneToMany(mappedBy = "professor")
    private List<Lecture> lectures = new ArrayList<>();

    @OneToOne(mappedBy = "professor", fetch = FetchType.LAZY)
    private Member member;
}
