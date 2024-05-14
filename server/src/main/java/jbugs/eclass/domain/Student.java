package jbugs.eclass.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;

    private String firstTrack;
    private String secondTrack;

    @OneToOne(mappedBy = "student", fetch = FetchType.LAZY)
    private Member member;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Enrollment> enrollments = new ArrayList<>();

//    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
//    private List<Attendance> attendances = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<ChatRoom> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<QuizInfo> quizInfos = new ArrayList<>();
}
