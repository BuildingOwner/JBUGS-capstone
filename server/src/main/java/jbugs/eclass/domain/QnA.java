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
    @GeneratedValue
    @Column(name = "qna_id")
    private Long id;

    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private QnAStatus qnaStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @OneToMany(mappedBy = "qna", cascade = CascadeType.ALL)
    private List<Material> materials = new ArrayList<>();
}
