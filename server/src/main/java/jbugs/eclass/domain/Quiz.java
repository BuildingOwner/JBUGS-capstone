package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Quiz {
    @Id @GeneratedValue
    @Column(name = "quiz_id")
    private Long id;

    private String jsonData; //퀴즈 생성 json 데이터

    private String quizName; // 퀴즈 이름
    private LocalDateTime deadline; // 종료일시
    private LocalDateTime createdAt; // 생성 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne(mappedBy = "quiz", fetch = FetchType.LAZY)
    private QuizInfo quizInfo;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
}
