package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Quiz {
    @Id @GeneratedValue
    @Column(name = "quiz_id")
    private Long id;

    private String quizName; // 퀴즈 이름
    private LocalDateTime deadline; // 종료일시
    private LocalDateTime createdAt; // 생성 시간
    private String jsonData; //퀴즈 생성 json 데이터

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    @OneToOne(mappedBy = "quiz", fetch = FetchType.LAZY)
    private QuizInfo quizInfo;
}
