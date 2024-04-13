package jbugs.eclass;

import jbugs.eclass.domain.*;
import jbugs.eclass.repository.QuizInfoRepository;
import jbugs.eclass.repository.WeekRepository;
import jbugs.eclass.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MemberService memberService;
    private final LectureService lectureService;
    private final EnrollmentService enrollmentService;
    private final AssignmentService assignmentService;
    private final WeekService weekService;
    private final PasswordEncoder passwordEncoder;
    private final WeekRepository weekRepository;
    private final QuizService quizService;
    private final NoticeService noticeService;
    private final QnAService qnAService;


    @Autowired
    public DataInitializer(MemberService memberService, LectureService lectureService, EnrollmentService enrollmentService, AssignmentService assignmentService, WeekService weekService, PasswordEncoder passwordEncoder, WeekRepository weekRepository, QuizService quizService, NoticeService noticeService, QnAService qnAService) {
        this.memberService = memberService;
        this.lectureService = lectureService;
        this.enrollmentService = enrollmentService;
        this.assignmentService = assignmentService;
        this.weekService = weekService;
        this.passwordEncoder = passwordEncoder;
        this.weekRepository = weekRepository;
        this.quizService = quizService;
        this.noticeService = noticeService;
        this.qnAService = qnAService;
    }

    @Override
    public void run(String... args) throws Exception {
        // 테스트 데이터 생성 및 저장
        Member member1 = new Member();
        member1.setLoginId("1971080");
        member1.setName("장주찬");
        String encodedPassword = passwordEncoder.encode("1234!");
        member1.setPassword(encodedPassword);
//        member1.setPassword("1234!");
        member1.setMemberType(MemberType.STUDENT);

        Student student1 = new Student();
        student1.setFirstTrack("웹공학트랙");
        student1.setSecondTrack("모바일소프트웨어트랙");

        member1.setStudent(student1);
        student1.setMember(member1);

        memberService.join(member1);

        Member member2 = new Member();
        member2.setLoginId("1111");
        member2.setName("김성동");
        String encodedPassword2 = passwordEncoder.encode("1234!");
        member2.setPassword(encodedPassword2);
        member2.setMemberType(MemberType.PROFESSOR);

        Professor professor1 = new Professor();
        professor1.setMajor("컴퓨터공학과");
        professor1.setEmail("sdkim@hansung.ac.kr");
        professor1.setLab("연구관327호");

        member2.setProfessor(professor1);
        professor1.setMember(member2);

        memberService.join(member2);

        Member member3 = new Member();
        member3.setLoginId("2222");
        member3.setName("강희중");
        String encodedPassword3 = passwordEncoder.encode("1234!");
        member3.setPassword(encodedPassword3);
        member3.setMemberType(MemberType.PROFESSOR);

        Professor professor2 = new Professor();
        professor2.setMajor("컴퓨터공학과");
        professor2.setEmail("hjkang@hansung.ac.kr");
        professor2.setLab("연구관320호");

        member3.setProfessor(professor2);
        professor2.setMember(member3);

        memberService.join(member3);

        Member member4 = new Member();
        member4.setLoginId("3333");
        member4.setName("한기준");
        String encodedPassword4 = passwordEncoder.encode("1234!");
        member4.setPassword(encodedPassword4);
        member4.setMemberType(MemberType.PROFESSOR);

        Professor professor3 = new Professor();
        professor3.setMajor("컴퓨터공학과");
        professor3.setEmail("keejun.han@hansung.ac.kr");
        professor3.setLab("연구관215호");

        member4.setProfessor(professor3);
        professor3.setMember(member4);

        memberService.join(member4);

        Member member5 = new Member();
        member5.setLoginId("4444");
        member5.setName("이재문");
        String encodedPassword5 = passwordEncoder.encode("1234!");
        member5.setPassword(encodedPassword5);
        member5.setMemberType(MemberType.PROFESSOR);

        Professor professor4 = new Professor();
        professor4.setMajor("컴퓨터공학과");
        professor4.setEmail("jmlee@hansung.ac.kr");
        professor4.setLab("연구관302호");

        member5.setProfessor(professor4);
        professor4.setMember(member5);

        memberService.join(member5);

        Member member6 = new Member();
        member6.setLoginId("5555");
        member6.setName("허준영");
        String encodedPassword6 = passwordEncoder.encode("1234!");
        member6.setPassword(encodedPassword6);
        member6.setMemberType(MemberType.PROFESSOR);

        Professor professor5 = new Professor();
        professor5.setMajor("컴퓨터공학과");
        professor5.setEmail("jyheo@hansung.ac.kr");
        professor5.setLab("연구관305호");

        member6.setProfessor(professor5);
        professor5.setMember(member6);

        memberService.join(member6);

        Member member7 = new Member();
        member7.setLoginId("6666");
        member7.setName("박승현");
        String encodedPassword7 = passwordEncoder.encode("1234!");
        member7.setPassword(encodedPassword7);
        member7.setMemberType(MemberType.PROFESSOR);

        Professor professor6 = new Professor();
        professor6.setMajor("컴퓨터공학과");
        professor6.setEmail("sp@hansung.ac.kr");
        professor6.setLab("연구관329호");

        member7.setProfessor(professor6);
        professor6.setMember(member7);

        memberService.join(member7);

        Member member8 = new Member();
        member8.setLoginId("1971083");
        member8.setName("이영재");
        String encodedPassword8 = passwordEncoder.encode("1234!");
        member8.setPassword(encodedPassword8);
        member8.setMemberType(MemberType.STUDENT);

        Student student2 = new Student();
        student2.setFirstTrack("모바일소프트웨어트랙");
        student2.setSecondTrack("웹공학트랙");

        member8.setStudent(student2);
        student2.setMember(member8);

        memberService.join(member8);

        Lecture lecture1 = new Lecture();
        lecture1.setName("알고리즘");
        lecture1.setProfessor(professor2);
        lecture1.setDivision("A");
        lecture1.setClassification("전필");
        lecture1.setLectureTime("월 13 ~ 14.5");

        Lecture lecture2 = new Lecture();
        lecture2.setName("모바일스마트시스템");
        lecture2.setProfessor(professor4);
        lecture2.setDivision("8");
        lecture2.setClassification("전필");
        lecture2.setLectureTime("월 10.5 ~ 12");

        Lecture lecture3 = new Lecture();
        lecture3.setName("컴파일러");
        lecture3.setProfessor(professor1);
        lecture3.setDivision("B");
        lecture3.setClassification("전선");
        lecture3.setLectureTime("화 9 ~ 12");

        Lecture lecture4 = new Lecture();
        lecture4.setName("설계패턴");
        lecture4.setProfessor(professor3);
        lecture4.setDivision("C");
        lecture4.setClassification("전선");
        lecture4.setLectureTime("수 13 ~ 16");

        Lecture lecture5 = new Lecture();
        lecture5.setName("안드로이드프로그래밍");
        lecture5.setProfessor(professor5);
        lecture5.setDivision("A");
        lecture5.setClassification("전필");
        lecture5.setLectureTime("금 13 ~ 14.5");

        Lecture lecture6 = new Lecture();
        lecture6.setName("웹프레임워크1");
        lecture6.setProfessor(professor6);
        lecture6.setDivision("7");
        lecture6.setClassification("전필");
        lecture6.setLectureTime("화 13 ~ 16");

        Lecture lecture7 = new Lecture();
        lecture7.setName("운영체제");
        lecture7.setProfessor(professor4);
        lecture7.setDivision("B");
        lecture7.setClassification("전선");
        lecture7.setLectureTime("수 9 ~ 12");

        Lecture lecture8 = new Lecture();
        lecture8.setName("알고리즘");
        lecture8.setProfessor(professor2);
        lecture8.setDivision("B");
        lecture8.setClassification("전필");
        lecture8.setLectureTime("월 14.5 ~ 16");

        lectureService.saveLecture(lecture1);
        lectureService.saveLecture(lecture2);
        lectureService.saveLecture(lecture3);
        lectureService.saveLecture(lecture4);
        lectureService.saveLecture(lecture5);
        lectureService.saveLecture(lecture6);
        lectureService.saveLecture(lecture7);

        enrollmentService.enrollStudentInLecture(student1, lecture1);
        enrollmentService.enrollStudentInLecture(student1, lecture2);
        enrollmentService.enrollStudentInLecture(student1, lecture3);
        enrollmentService.enrollStudentInLecture(student1, lecture4);
        enrollmentService.enrollStudentInLecture(student1, lecture5);
        enrollmentService.enrollStudentInLecture(student1, lecture6);

        enrollmentService.enrollStudentInLecture(student2, lecture1);
        enrollmentService.enrollStudentInLecture(student2, lecture2);
        enrollmentService.enrollStudentInLecture(student2, lecture3);

        Week week1 = weekRepository.findOne(1L);
        Week week2 = weekRepository.findOne(2L);
        Week week3 = weekRepository.findOne(3L);
        Week week4 = weekRepository.findOne(20L);
        Week week5 = weekRepository.findOne(41L);
        Week week6 = weekRepository.findOne(51L);
        Week week7 = weekRepository.findOne(68L);
        Week week8 = weekRepository.findOne(84L);
        Week week9 = weekRepository.findOne(101L);

        assignmentService.createAssignment(week1.getId(), "과제 제목 1", "과제 내용 1", LocalDateTime.of(2024, 5, 15, 23, 59));
        assignmentService.createAssignment(week2.getId(), "과제 제목 2", "과제 내용 2", LocalDateTime.of(2024, 5, 22, 23, 59));
        assignmentService.createAssignment(week3.getId(), "과제 제목 3", "과제 내용 3", LocalDateTime.of(2024, 5, 29, 23, 59));
        assignmentService.createAssignment(week4.getId(), "과제 제목 4", "과제 내용 4", LocalDateTime.of(2024, 5, 15, 23, 59));
        assignmentService.createAssignment(week5.getId(), "과제 제목 5", "과제 내용 5", LocalDateTime.of(2024, 5, 22, 23, 59));
        assignmentService.createAssignment(week6.getId(), "과제 제목 6", "과제 내용 6", LocalDateTime.of(2024, 5, 29, 23, 59));
        assignmentService.createAssignment(week7.getId(), "과제 제목 7", "과제 내용 7", LocalDateTime.of(2024, 5, 15, 23, 59));
        assignmentService.createAssignment(week8.getId(), "과제 제목 8", "과제 내용 8", LocalDateTime.of(2024, 5, 22, 23, 59));
        assignmentService.createAssignment(week9.getId(), "과제 제목 9", "과제 내용 9", LocalDateTime.of(2024, 5, 29, 23, 59));

        Quiz quiz1 = new Quiz();
        quiz1.setQuizName("컴퓨터 과학 1주차 퀴즈");
        quiz1.setQuizType("연습 문제");
        quiz1.setCreatedAt(LocalDateTime.of(2024, 4, 11, 23, 59));
        quiz1.setUpdateAt(LocalDateTime.of(2024, 4, 11, 23, 59));
        quiz1.setDeadline(LocalDateTime.of(2024, 5, 30, 23, 59));
        quiz1.setJsonData("test");
        quiz1.setWeek(week1);

        Quiz quiz2 = new Quiz();
        quiz2.setQuizName("생활속의 인공지능 1주차 퀴즈");
        quiz2.setQuizType("연습 문제");
        quiz2.setCreatedAt(LocalDateTime.of(2024, 4, 11, 23, 59));
        quiz2.setUpdateAt(LocalDateTime.of(2024, 4, 11, 23, 59));
        quiz2.setDeadline(LocalDateTime.of(2024, 5, 30, 23, 59));
        quiz2.setJsonData("test");
        quiz2.setWeek(week2);

        QuizInfo quizInfo1 = new QuizInfo();
        quizInfo1.setQuiz(quiz1);
        quizInfo1.setQuizScore(100);
        quizInfo1.setStudent(student1);
        quizInfo1.setSubmittedAt(LocalDateTime.of(2024, 4, 12, 23, 59));
        quizInfo1.setSubmissionStatus(true);

        QuizInfo quizInfo2 = new QuizInfo();
        quizInfo2.setQuiz(quiz2);
        quizInfo2.setStudent(student1);
        quizInfo2.setSubmissionStatus(false);

        quizService.saveQuizInfo(quizInfo1);
        quizService.saveQuizInfo(quizInfo2);

        quizService.saveQuiz(quiz1);
        quizService.saveQuiz(quiz2);

        noticeService.createNotice(lecture1.getId(),"중간고사 공지하겠습니다.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "중간고사에 대해 공지하겠습니다.",NoticeStatus.EXAM);
        noticeService.createNotice(lecture1.getId(),"4월 12일은 온라인 수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다",NoticeStatus.ONLINE);
        noticeService.createNotice(lecture1.getId(),"4월 22일은 온라인 수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100,"온라인수업으로 대체합니다", NoticeStatus.ONLINE);
        noticeService.createNotice(lecture1.getId(),"4월 25일은 대면수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 8, 23, 59), 100,"대면수업으로 대체합니다", NoticeStatus.FACE_TO_FACE_CLASSES);
        noticeService.createNotice(lecture1.getId(),"기말고사 공지하겠습니다", "장주찬", LocalDateTime.of(2024, 4, 13, 23, 59), 100,"기말고사에 대해 공지하겠습니다.",NoticeStatus.EXAM);

        noticeService.createNotice(lecture2.getId(),"중간고사 공지하겠습니다.1", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100,"중간고사에 대해 공지하겠습니다.", NoticeStatus.EXAM);
        noticeService.createNotice(lecture2.getId(),"4월 12일은 온라인 수업입니다.2", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다", NoticeStatus.ONLINE);
        noticeService.createNotice(lecture2.getId(),"4월 22일은 온라인 수업입니다.3", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다", NoticeStatus.ONLINE);
        noticeService.createNotice(lecture2.getId(),"4월 25일은 대면수업입니다.4", "장주찬", LocalDateTime.of(2024, 4, 8, 23, 59), 100, "대면수업으로 대체합니다", NoticeStatus.FACE_TO_FACE_CLASSES);
        noticeService.createNotice(lecture2.getId(),"기말고사 공지하겠습니다.", "장주찬", LocalDateTime.of(2024, 4, 13, 23, 59), 100, "기말고사에 대해 공지하겠습니다.", NoticeStatus.EXAM);

        qnAService.createQnA(lecture1.getId(),"이건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
        qnAService.createQnA(lecture1.getId(),"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
        qnAService.createQnA(lecture1.getId(),"요건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
        qnAService.createQnA(lecture1.getId(),"그건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
        qnAService.createQnA(lecture1.getId(),"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);

        qnAService.createQnA(lecture2.getId(),"이건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
        qnAService.createQnA(lecture2.getId(),"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
        qnAService.createQnA(lecture2.getId(),"요건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
        qnAService.createQnA(lecture2.getId(),"그건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
        qnAService.createQnA(lecture2.getId(),"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
    }
}
