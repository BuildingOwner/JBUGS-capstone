package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Quiz {

    @Id
    @GeneratedValue
    @Column(name = "quiz_id")
    private Long id;

    private String title; // 퀴즈 이름
    private String question; // 퀴즈의 문제
    private String answer; // 퀴즈의 정답

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @ElementCollection
    @CollectionTable(name = "quiz_choices", joinColumns = @JoinColumn(name = "quiz_id"))
    @Column(name = "choice")
    private List<String> choices; // 퀴즈의 보기
}
