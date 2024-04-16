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

    @Column(length = 50000)
    private String jsonData; //퀴즈 생성 json 데이터
    @Column(length = 50000)
    private String discription; // 설명

    private String quizName; // 퀴즈 이름
    private String quizType; // 문제 분류
    private LocalDateTime deadline; // 종료일시
    private LocalDateTime createdAt; // 생성 시간
    private LocalDateTime updateAt; // 수정 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;

    @OneToOne(mappedBy = "quiz", fetch = FetchType.LAZY)
    private QuizInfo quizInfo;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
}
