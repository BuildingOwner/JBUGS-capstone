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
public class QnA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private QnAStatus qnaStatus;
    @Column(length = 50000)
    private String comment;
    private boolean secret;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @OneToMany(mappedBy = "qna", cascade = CascadeType.ALL)
    private List<Material> materials = new ArrayList<>();
}
