//package jbugs.eclass.domain;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//public class Attendance {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "attendance_id")
//    private String id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "student_id")
//    private Student student;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "week_id")
//    private Week week;
//
//    private boolean present; // 출석 여부
//}
