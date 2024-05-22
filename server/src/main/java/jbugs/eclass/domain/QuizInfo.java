package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
public class QuizInfo {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "quiz_info_id")
    private Long id;

    private Integer quizScore; // 퀴즈 점수
    private boolean submissionStatus; // 제출 상태
    private LocalDateTime submittedAt; // 제출 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ElementCollection
    @CollectionTable(name = "answer_details", joinColumns = @JoinColumn(name = "quiz_info_id"))
    @MapKeyColumn(name = "question_number")
    @Column(name = "answer")
    private Map<String, String> answers = new HashMap<>();
}
