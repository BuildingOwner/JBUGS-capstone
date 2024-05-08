//package jbugs.eclass;
//
//import jbugs.eclass.domain.*;
//import jbugs.eclass.repository.*;
//import jbugs.eclass.service.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.Optional;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    private final MemberService memberService;
//    private final LectureService lectureService;
//    private final EnrollmentService enrollmentService;
//    private final AssignmentService assignmentService;
//    private final WeekService weekService;
//    private final PasswordEncoder passwordEncoder;
//    private final WeekRepository weekRepository;
//    private final QuizService quizService;
//    private final NoticeService noticeService;
//    private final QnAService qnAService;
//    private final MaterialRepository materialRepository;
//    private final VideoMaterialRepository videoMaterialRepository;
//    private final ChatRepository chatRepository;
//
//
//    @Autowired
//    public DataInitializer(MemberService memberService, LectureService lectureService, EnrollmentService enrollmentService, AssignmentService assignmentService, WeekService weekService, PasswordEncoder passwordEncoder, WeekRepository weekRepository, QuizService quizService, NoticeService noticeService, QnAService qnAService, MaterialRepository materialRepository, VideoMaterialRepository videoMaterialRepository, ChatRepository chatRepository) {
//        this.memberService = memberService;
//        this.lectureService = lectureService;
//        this.enrollmentService = enrollmentService;
//        this.assignmentService = assignmentService;
//        this.weekService = weekService;
//        this.passwordEncoder = passwordEncoder;
//        this.weekRepository = weekRepository;
//        this.quizService = quizService;
//        this.noticeService = noticeService;
//        this.qnAService = qnAService;
//        this.materialRepository = materialRepository;
//        this.videoMaterialRepository = videoMaterialRepository;
//        this.chatRepository = chatRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        // 테스트 데이터 생성 및 저장
//        Member member1 = new Member();
//        member1.setLoginId("1971080");
//        member1.setName("장주찬");
//        String encodedPassword = passwordEncoder.encode("1234!");
//        member1.setPassword(encodedPassword);
//        member1.setMemberType(MemberType.STUDENT);
//
//        Student student1 = new Student();
//        student1.setFirstTrack("웹공학트랙");
//        student1.setSecondTrack("모바일소프트웨어트랙");
//
//        member1.setStudent(student1);
//        student1.setMember(member1);
//
//        memberService.join(member1);
//
//        Member member2 = new Member();
//        member2.setLoginId("1111");
//        member2.setName("김성동");
//        String encodedPassword2 = passwordEncoder.encode("1234!");
//        member2.setPassword(encodedPassword2);
//        member2.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor1 = new Professor();
//        professor1.setMajor("컴퓨터공학과");
//        professor1.setEmail("sdkim@hansung.ac.kr");
//        professor1.setLab("연구관327호");
//
//        member2.setProfessor(professor1);
//        professor1.setMember(member2);
//
//        memberService.join(member2);
//
//        Member member3 = new Member();
//        member3.setLoginId("2222");
//        member3.setName("강희중");
//        String encodedPassword3 = passwordEncoder.encode("1234!");
//        member3.setPassword(encodedPassword3);
//        member3.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor2 = new Professor();
//        professor2.setMajor("컴퓨터공학과");
//        professor2.setEmail("hjkang@hansung.ac.kr");
//        professor2.setLab("연구관320호");
//
//        member3.setProfessor(professor2);
//        professor2.setMember(member3);
//
//        memberService.join(member3);
//
//        Member member4 = new Member();
//        member4.setLoginId("3333");
//        member4.setName("한기준");
//        String encodedPassword4 = passwordEncoder.encode("1234!");
//        member4.setPassword(encodedPassword4);
//        member4.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor3 = new Professor();
//        professor3.setMajor("컴퓨터공학과");
//        professor3.setEmail("keejun.han@hansung.ac.kr");
//        professor3.setLab("연구관215호");
//
//        member4.setProfessor(professor3);
//        professor3.setMember(member4);
//
//        memberService.join(member4);
//
//        Member member5 = new Member();
//        member5.setLoginId("4444");
//        member5.setName("이재문");
//        String encodedPassword5 = passwordEncoder.encode("1234!");
//        member5.setPassword(encodedPassword5);
//        member5.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor4 = new Professor();
//        professor4.setMajor("컴퓨터공학과");
//        professor4.setEmail("jmlee@hansung.ac.kr");
//        professor4.setLab("연구관302호");
//
//        member5.setProfessor(professor4);
//        professor4.setMember(member5);
//
//        memberService.join(member5);
//
//        Member member6 = new Member();
//        member6.setLoginId("5555");
//        member6.setName("허준영");
//        String encodedPassword6 = passwordEncoder.encode("1234!");
//        member6.setPassword(encodedPassword6);
//        member6.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor5 = new Professor();
//        professor5.setMajor("컴퓨터공학과");
//        professor5.setEmail("jyheo@hansung.ac.kr");
//        professor5.setLab("연구관305호");
//
//        member6.setProfessor(professor5);
//        professor5.setMember(member6);
//
//        memberService.join(member6);
//
//        Member member7 = new Member();
//        member7.setLoginId("6666");
//        member7.setName("박승현");
//        String encodedPassword7 = passwordEncoder.encode("1234!");
//        member7.setPassword(encodedPassword7);
//        member7.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor6 = new Professor();
//        professor6.setMajor("컴퓨터공학과");
//        professor6.setEmail("sp@hansung.ac.kr");
//        professor6.setLab("연구관329호");
//
//        member7.setProfessor(professor6);
//        professor6.setMember(member7);
//
//        memberService.join(member7);
//
//        Member member8 = new Member();
//        member8.setLoginId("1971233");
//        member8.setName("최재완");
//        member8.setPassword(encodedPassword);
//        member8.setMemberType(MemberType.STUDENT);
//        Student student2 = new Student();
//        student2.setFirstTrack("모바일소프트웨어트랙");
//        student2.setSecondTrack("웹공학트랙");
//        member8.setStudent(student2);
//        student2.setMember(member8);
//        memberService.join(member8);
//
//        Member member9 = new Member();
//        member9.setLoginId("1971084");
//        member9.setName("진승원");
//        member9.setPassword(encodedPassword);
//        member9.setMemberType(MemberType.STUDENT);
//        Student student3 = new Student();
//        student3.setFirstTrack("모바일소프트웨어트랙");
//        student3.setSecondTrack("웹공학트랙");
//        member9.setStudent(student3);
//        student3.setMember(member9);
//        memberService.join(member9);
//
//        Lecture lecture1 = new Lecture();
//        lecture1.setName("알고리즘");
//        lecture1.setProfessor(professor2);
//        lecture1.setDivision("A");
//        lecture1.setClassification("전필");
//        lecture1.setLectureTime("월 13 ~ 14.5");
//
//        Lecture lecture2 = new Lecture();
//        lecture2.setName("모바일스마트시스템");
//        lecture2.setProfessor(professor4);
//        lecture2.setDivision("8");
//        lecture2.setClassification("전필");
//        lecture2.setLectureTime("월 10.5 ~ 12");
//
//        Lecture lecture3 = new Lecture();
//        lecture3.setName("컴파일러");
//        lecture3.setProfessor(professor1);
//        lecture3.setDivision("B");
//        lecture3.setClassification("전선");
//        lecture3.setLectureTime("화 9 ~ 12");
//
//        Lecture lecture4 = new Lecture();
//        lecture4.setName("설계패턴");
//        lecture4.setProfessor(professor3);
//        lecture4.setDivision("C");
//        lecture4.setClassification("전선");
//        lecture4.setLectureTime("수 13 ~ 16");
//
//        Lecture lecture5 = new Lecture();
//        lecture5.setName("안드로이드프로그래밍");
//        lecture5.setProfessor(professor5);
//        lecture5.setDivision("A");
//        lecture5.setClassification("전필");
//        lecture5.setLectureTime("금 13 ~ 14.5");
//
//        Lecture lecture6 = new Lecture();
//        lecture6.setName("웹프레임워크1");
//        lecture6.setProfessor(professor6);
//        lecture6.setDivision("7");
//        lecture6.setClassification("전필");
//        lecture6.setLectureTime("화 13 ~ 16");
//
//        Lecture lecture7 = new Lecture();
//        lecture7.setName("운영체제");
//        lecture7.setProfessor(professor4);
//        lecture7.setDivision("B");
//        lecture7.setClassification("전선");
//        lecture7.setLectureTime("수 9 ~ 12");
//
//        Lecture lecture8 = new Lecture();
//        lecture8.setName("알고리즘");
//        lecture8.setProfessor(professor2);
//        lecture8.setDivision("B");
//        lecture8.setClassification("전필");
//        lecture8.setLectureTime("월 14.5 ~ 16");
//
//        lectureService.saveLecture(lecture1);
//        lectureService.saveLecture(lecture2);
//        lectureService.saveLecture(lecture3);
//        lectureService.saveLecture(lecture4);
//        lectureService.saveLecture(lecture5);
//        lectureService.saveLecture(lecture6);
//        lectureService.saveLecture(lecture7);
//
//        int memberIndex = 1;
//        String[] studentNames = {"김지훈","박세진", "박서연", "도민준","이하은","장도윤","박지우","이유진","김현우","한수아","신지호", "김예은", "김태현", "김민서", "박준호", "이하윤", "차은우", "박서현", "김지안", "조우진", "박소율", "김민주"};
//        for(String name : studentNames) {
//            Member member10 = new Member();
//            member10.setLoginId("19710" + memberIndex); // 로그인 ID 설정
//            member10.setName(name); // 이름 설정 // 비밀번호 인코딩
//            member10.setPassword(encodedPassword);
//            member10.setMemberType(MemberType.STUDENT); // 멤버 타입 설정
//
//            Student student5 = new Student();
//            student5.setFirstTrack("웹공학트랙"); // 첫 번째 트랙 설정
//            student5.setSecondTrack("모바일소프트웨어트랙"); // 두 번째 트랙 설정
//            member10.setStudent(student5); // 학생 정보 설정
//            student5.setMember(member10); // 멤버 정보 설정
//
//            memberService.join(member10); // 멤버 서비스를 통해 저장
//            enrollmentService.enrollStudentInLecture(student5, lecture1);
//            enrollmentService.enrollStudentInLecture(student5, lecture2);
//            enrollmentService.enrollStudentInLecture(student5, lecture3);
//            enrollmentService.enrollStudentInLecture(student5, lecture4);
//            enrollmentService.enrollStudentInLecture(student5, lecture5);
//            enrollmentService.enrollStudentInLecture(student5, lecture6);
//
//            memberIndex++; // 다음 멤버를 위해 인덱스 증가
//        }
//
//        enrollmentService.enrollStudentInLecture(student1, lecture1);
//        enrollmentService.enrollStudentInLecture(student1, lecture2);
//        enrollmentService.enrollStudentInLecture(student1, lecture3);
//        enrollmentService.enrollStudentInLecture(student1, lecture4);
//        enrollmentService.enrollStudentInLecture(student1, lecture5);
//        enrollmentService.enrollStudentInLecture(student1, lecture6);
//
//        enrollmentService.enrollStudentInLecture(student2, lecture1);
//        enrollmentService.enrollStudentInLecture(student2, lecture2);
//        enrollmentService.enrollStudentInLecture(student2, lecture3);
//        enrollmentService.enrollStudentInLecture(student2, lecture4);
//        enrollmentService.enrollStudentInLecture(student2, lecture5);
//        enrollmentService.enrollStudentInLecture(student2, lecture6);
//
//        enrollmentService.enrollStudentInLecture(student3, lecture1);
//        enrollmentService.enrollStudentInLecture(student3, lecture2);
//        enrollmentService.enrollStudentInLecture(student3, lecture3);
//        enrollmentService.enrollStudentInLecture(student3, lecture4);
//        enrollmentService.enrollStudentInLecture(student3, lecture5);
//        enrollmentService.enrollStudentInLecture(student3, lecture6);
//
//        Optional<Week> week1 = weekRepository.findById(1L);
//        Optional<Week> week2 = weekRepository.findById(2L);
//        Optional<Week> week3 = weekRepository.findById(3L);
//        Optional<Week> week4 = weekRepository.findById(20L);
//        Optional<Week> week5 = weekRepository.findById(41L);
//        Optional<Week> week6 = weekRepository.findById(51L);
//        Optional<Week> week7 = weekRepository.findById(68L);
//        Optional<Week> week8 = weekRepository.findById(84L);
//        Optional<Week> week9 = weekRepository.findById(101L);
//
//        assignmentService.createAssignment(week1.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 1", "과제 내용 1", LocalDateTime.of(2024, 5, 15, 23, 59));
//        assignmentService.createAssignment(week2.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 2", "과제 내용 2", LocalDateTime.of(2024, 5, 22, 23, 59));
//        assignmentService.createAssignment(week3.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 3", "과제 내용 3", LocalDateTime.of(2024, 5, 29, 23, 59));
//        assignmentService.createAssignment(week4.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 4", "과제 내용 4", LocalDateTime.of(2024, 5, 15, 23, 59));
//        assignmentService.createAssignment(week5.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 5", "과제 내용 5", LocalDateTime.of(2024, 5, 22, 23, 59));
//        assignmentService.createAssignment(week6.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 6", "과제 내용 6", LocalDateTime.of(2024, 5, 29, 23, 59));
//        assignmentService.createAssignment(week7.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 7", "과제 내용 7", LocalDateTime.of(2024, 5, 15, 23, 59));
//        assignmentService.createAssignment(week8.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 8", "과제 내용 8", LocalDateTime.of(2024, 5, 22, 23, 59));
//        assignmentService.createAssignment(week9.orElseThrow(() -> new NoSuchElementException("Week not found")).getId(), "과제 제목 9", "과제 내용 9", LocalDateTime.of(2024, 5, 29, 23, 59));
//
//        Quiz quiz1 = new Quiz();
//        quiz1.setQuizName("컴퓨터 과학 1주차 퀴즈");
//        quiz1.setQuizType(QuizType.PRACTICE);
//        quiz1.setCreatedAt(LocalDateTime.of(2024, 4, 11, 23, 59));
//        quiz1.setUpdateAt(LocalDateTime.of(2024, 4, 11, 23, 59));
//        quiz1.setDeadline(LocalDateTime.of(2024, 5, 30, 23, 59));
//        quiz1.setJsonData("{\"questions\": [{\"question\": \"iOS 앱 개발에서 GCD(Grand Central Dispatch)의 주요 사용 목적은 무엇인가?\", \"options\": [\"앱의 아이콘 디자인을 개선하기 위해\", \"데이터 베이스 관리를 위해\", \"멀티쓰레딩을 효과적으로 관리하기 위해\", \"음악 재생을 관리하기 위해\"], \"answer\": \"멀티쓰레딩을 효과적으로 관리하기 위해\", \"type\": \"choice\", \"id\": 1}, {\"question\": \"iOS 앱 개발에서 URLSession의 사용 목적은 무엇인가?\", \"options\": [\"UI 디자인을 개선하기 위해\", \"서버와 데이터를 교환하기 위해\", \"앱 내 결제 시스템을 구현하기 위해\", \"사진 필터 기능을 추가하기 위해\"], \"answer\": \"서버와 데이터를 교환하기 위해\", \"type\": \"choice\", \"id\": 2}, {\"question\": \"iOS 개발에서 CocoaPods의 주요 용도는 무엇인가?\", \"options\": [\"응용 프로그램의 소스 코드 암호화를 위해\", \"의존성 관리자로서 라이브러리 관리를 돕기 위해\", \"앱의 배포 버전 관리를 위해\", \"프로젝트의 UI 테마를 설정하기 위해\"], \"answer\": \"의존성 관리자로서 라이브러리 관리를 돕기 위해\", \"type\": \"choice\", \"id\": 3}, {\"question\": \"SwiftPM을 사용하여 iOS 프로젝트에 라이브러리를 설치하는 주된 목적은 무엇인가?\", \"options\": [\"프로젝트의 실행 속도를 향상시키기 위해\", \"의존성 관리를 자동화하고 간소화하기 위해\", \"앱의 보안 문제를 해결하기 위해\", \"모바일 기기의 배터리 성능을 향상시키기 위해\"], \"answer\": \"의존성 관리를 자동화하고 간소화하기 위해\", \"type\": \"choice\", \"id\": 4}, {\"question\": \"Swift에서 비동기(asynchronous) 실행이 주로 사용되는 시나리오는 무엇인가?\", \"options\": [\"단일 작업을 빠르게 실행하기 위해\", \"작업의 시작 순서를 엄격하게 제어하기 위해\", \"여러 작업을 동시에 처리하고 완료 순서가 중요하지 않을 때\", \"앱의 보안 설정을 구성하기 위해\"], \"answer\": \"여러 작업을 동시에 처리하고 완료 순서가 중요하지 않을 때\", \"type\": \"choice\", \"id\": 5}, {\"question\": \"iOS 개발에서 SVProgressHUD 라이브러리를 사용하는 주된 목적은 무엇인가?\", \"options\": [\"서버 요청을 보내기 위해\", \"데이터베이스와 동기화를 위해\", \"사용자에게 로딩 상태를 시각적으로 표시하기 위해\", \"음성 인식 기능을 추가하기 위해\"], \"answer\": \"사용자에게 로딩 상태를 시각적으로 표시하기 위해\", \"type\": \"choice\", \"id\": 6}, {\"question\": \"iOS 앱 개발에서 asyncAfter 메서드의 주요 사용 시나리오는 무엇인가?\", \"options\": [\"UI 디자인 요소를 동적으로 변경하기 위해\", \"특정 작업을 지연시키고 싶을 때\", \"데이터베이스 조회 쿼리의 성능을 향상시키기 위해\", \"소셜 미디어 피드를 실시간으로 업데이트하기 위해\"], \"answer\": \"특정 작업을 지연시키고 싶을 때\", \"type\": \"choice\", \"id\": 7}, {\"question\": \"iOS 개발 시 REST API 요청을 위해 주로 사용되는 클래스는 무엇인가?\", \"options\": [\"UIView\", \"UIViewController\", \"URLSession\", \"NSData\"], \"answer\": \"URLSession\", \"type\": \"choice\", \"id\": 8}, {\"question\": \"iOS 개발에서 JSON 데이터 파싱을 위해 주로 사용되는 프로토콜은 무엇인가?\", \"options\": [\"UIViewController\", \"JSONDecoder\", \"Codable\", \"UIView\"], \"answer\": \"Codable\", \"type\": \"choice\", \"id\": 9}, {\"question\": \"iOS 개발에서 TabBar를 사용하는 주된 목적은 무엇인가?\", \"options\": [\"데이터 암호화를 위해\", \"다양한 뷰 사이를 전환하기 위해\", \"앱의 네트워크 속도를 향상시키기 위해\", \"배경 음악을 제어하기 위해\"], \"answer\": \"다양한 뷰 사이를 전환하기 위해\", \"type\": \"choice\", \"id\": 10}, {\"question\": \"iOS 앱 개발에서 주로 UI 업데이트와 직접 관련된 작업을 수행하는 쓰레드는 무엇인가?\", \"answer\": \"메인 쓰레드\", \"type\": \"short\", \"id\": 11}, {\"question\": \"iOS 개발에서 DispatchQueue의 Serial 큐는 무슨 목적으로 사용되나?\", \"answer\": \"작업이 순차적으로 실행되도록 하기 위해\", \"type\": \"short\", \"id\": 12}, {\"question\": \"iOS 앱 개발에서 사용자 인터페이스를 업데이트할 때 주로 사용하는 큐는 무엇인가?\", \"answer\": \"메인 큐\", \"type\": \"short\", \"id\": 13}, {\"question\": \"iOS 앱 개발에서 비동기 실행을 사용하는 주된 이유는 무엇인가?\", \"answer\": \"응답성 향상\", \"type\": \"short\", \"id\": 14}, {\"question\": \"iOS 앱 개발에서 SVProgressHUD 라이브러리를 사용할 때 주로 어떤 의존성 관리자를 통해 설치하는가?\", \"answer\": \"CocoaPods\", \"type\": \"short\", \"id\": 15}]}");
//        quiz1.setDescription("컴퓨터 과학에 대한 설명입니다.");
//        quiz1.setTimeLimit("60분");
//        quiz1.setWeek(week1.orElseThrow());
//
//        Quiz quiz2 = new Quiz();
//        quiz2.setQuizName("생활속의 인공지능 1주차 퀴즈");
//        quiz2.setQuizType(QuizType.PRACTICE);
//        quiz2.setCreatedAt(LocalDateTime.of(2024, 4, 11, 23, 59));
//        quiz2.setUpdateAt(LocalDateTime.of(2024, 4, 11, 23, 59));
//        quiz2.setDeadline(LocalDateTime.of(2024, 5, 30, 23, 59));
//        quiz2.setJsonData("{\"questions\": [{\"question\": \"JPA에서 @ManyToOne 및 @OneToMany 관계 설정의 주된 목적은 무엇인가?\", \"options\": [\"단일 엔티티와 단일 엔티티 간의 관계를 정의하기 위해\", \"다수의 엔티티 간 복잡한 관계를 형성하기 위해\", \"한 엔티티가 다수의 다른 엔티티와 관계를 맺고, 반대쪽에서도 다수를 하나로 연결하는 구조를 정의하기 위해\", \"모든 엔티티를 동일한 방법으로 처리하기 위해\"], \"answer\": \"한 엔티티가 다수의 다른 엔티티와 관계를 맺고, 반대쪽에서도 다수를 하나로 연결하는 구조를 정의하기 위해\", \"type\": \"choice\", \"id\": 1}, {\"question\": \"JPA에서 엔티티 관계에서 FetchType.EAGER의 주된 특성은 무엇인가?\", \"options\": [\"연관된 모든 엔티티를 나중에 필요할 때까지 로딩하지 않는다.\", \"연관된 엔티티를 즉시 로딩하여 성능 이슈가 발생할 수 있다.\", \"외래 키를 이용해서만 관계된 엔티티를 로딩한다.\", \"엔티티를 로딩할 때마다 새로운 쿼리를 생성하여 데이터베이스에 보낸다.\"], \"answer\": \"연관된 엔티티를 즉시 로딩하여 성능 이슈가 발생할 수 있다.\", \"type\": \"choice\", \"id\": 2}, {\"question\": \"JPA에서 @JoinColumn 애노테이션이 사용되는 주된 목적은 무엇인가?\", \"options\": [\"엔티티 간의 다대다 관계를 정의하기 위해\", \"단방향 관계에서만 사용되는 특별한 설정을 제공하기 위해\", \"외래 키를 이용하여 엔티티 간 관계를 맺는 열을 정의하기 위해\", \"모든 엔티티에서 사용되는 기본 키를 자동으로 생성하기 위해\"], \"answer\": \"외래 키를 이용하여 엔티티 간 관계를 맺는 열을 정의하기 위해\", \"type\": \"choice\", \"id\": 3}, {\"question\": \"JPA에서 양방향 관계를 설정할 때 사용되는 'mappedBy' 속성의 주된 기능은 무엇인가?\", \"options\": [\"'mappedBy' 속성은 연관된 엔티티들 사이에서 주 엔티티를 지정하기 위해 사용된다.\", \"'mappedBy' 속성은 테이블 간의 조인을 정의하기 위해서 사용된다.\", \"'mappedBy' 속성은 양방향 관계에서의 관계의 주체가 되는 엔티티의 필드 이름을 지정하기 위해 사용된다.\", \"'mappedBy' 속성은 엔티티의 기본 키를 생성하는 전략을 정의하기 위해 사용된다.\"], \"answer\": \"'mappedBy' 속성은 양방향 관계에서의 관계의 주체가 되는 엔티티의 필드 이름을 지정하기 위해 사용된다.\", \"type\": \"choice\", \"id\": 4}, {\"question\": \"JPA의 cascade 옵션을 사용하는 주요 목적은 무엇인가?\", \"options\": [\"외래 키 제약 조건을 자동으로 생성하기 위해\", \"연관된 엔티티들 간의 연산(생성, 삭제, 업데이트 등)을 자동으로 전파하기 위해\", \"엔티티와 데이터베이스 테이블 간의 관계를 매핑하기 위해\", \"엔티티의 생명 주기 상태를 관리하기 위해\"], \"answer\": \"연관된 엔티티들 간의 연산(생성, 삭제, 업데이트 등)을 자동으로 전파하기 위해\", \"type\": \"choice\", \"id\": 5}, {\"question\": \"JPA에서 FetchType.LAZY의 주된 특성은 무엇인가?\", \"options\": [\"연관된 모든 엔티티를 즉시 로딩한다.\", \"필요할 때까지 연관된 엔티티를 로딩하지 않는다.\", \"모든 외래 키를 즉시 로딩하여 성능을 최적화한다.\", \"엔티티 간의 관계를 매핑하지 않는다.\"], \"answer\": \"필요할 때까지 연관된 엔티티를 로딩하지 않는다.\", \"type\": \"choice\", \"id\": 6}, {\"question\": \"JPA에서 엔티티들 간의 @ManyToMany 관계를 설정할 때 주로 사용되는 애노테이션은 무엇인가?\", \"options\": [\"@JoinColumn\", \"@OneToMany\", \"@JoinTable\", \"@ManyToOne\"], \"answer\": \"@JoinTable\", \"type\": \"choice\", \"id\": 7}, {\"question\": \"JPA에서 데이터베이스의 엔티티 관계를 모델링 할 때, '@OneToOne' 관계가 주로 사용되는 시나리오는 무엇인가?\", \"options\": [\"여러 엔티티가 하나의 엔티티를 공유할 때\", \"두 엔티티가 상호 독립적일 때\", \"하나의 엔티티가 다른 하나의 엔티티와 독점적인 1:1 관계를 가질 때\", \"데이터베이스 테이블 간에 복잡한 조인 연산을 수행할 때\"], \"answer\": \"하나의 엔티티가 다른 하나의 엔티티와 독점적인 1:1 관계를 가질 때\", \"type\": \"choice\", \"id\": 8}, {\"question\": \"JPA에서 @JoinColumn 애노테이션과 함께 사용되는 'nullable' 속성의 주된 용도는 무엇인가?\", \"options\": [\"'nullable' 속성은 관계된 엔티티들 간에 고유성을 강제하기 위해 사용된다.\", \"'nullable' 속성은 외래 키 칼럼의 null 허용 여부를 지정하기 위해 사용된다.\", \"'nullable' 속성은 관계의 방향성을 정의하기 위해 사용된다.\", \"'nullable' 속성은 엔티티의 기본 키 값을 자동으로 생성하기 위해 사용된다.\"], \"answer\": \"'nullable' 속성은 외래 키 칼럼의 null 허용 여부를 지정하기 위해 사용된다.\", \"type\": \"choice\", \"id\": 9}, {\"question\": \"JPA에서 @ManyToMany 관계를 설정할 때 'cascade' 옵션을 사용하는 이유는 무엇인가?\", \"options\": [\"조인 테이블의 구조를 정의하기 위해\", \"연관된 엔티티들 간의 연산(생성, 삭제, 업데이트 등)을 자동으로 전파하기 위해\", \"데이터베이스 스키마 생성시 필요한 인덱스를 자동으로 추가하기 위해\", \"연관된 엔티티들 사이의 조인 순서를 지정하기 위해\"], \"answer\": \"연관된 엔티티들 간의 연산(생성, 삭제, 업데이트 등)을 자동으로 전파하기 위해\", \"type\": \"choice\", \"id\": 10}, {\"question\": \"JPA에서 'fetch' 옵션의 기본값은 무엇인가?\", \"answer\": \"FetchType.EAGER\", \"type\": \"short\", \"id\": 11}, {\"question\": \"JPA에서 엔티티를 데이터베이스에 저장하고 검색하는 기능을 캡슐화하는 클래스는 무엇인가?\", \"answer\": \"DAO\", \"type\": \"short\", \"id\": 12}, {\"question\": \"JPA에서 @ManyToMany 관계 설정 시 필요한 조인 테이블을 명시하는 애노테이션은 무엇인가?\", \"answer\": \"@JoinTable\", \"type\": \"short\", \"id\": 13}, {\"question\": \"JPA에서 객체와 테이블을 연결하는 과정을 무엇이라고 하나?\", \"answer\": \"매핑\", \"type\": \"short\", \"id\": 14}, {\"question\": \"JPA에서 엔티티의 상태 변화를 관리하는 컨텍스트는 무엇인가?\", \"answer\": \"영속성 컨텍스트\", \"type\": \"short\", \"id\": 15}]}");
//        quiz2.setDescription("생활속의 인공지능에 대한 설명입니다.");
//        quiz2.setTimeLimit("60분");
//        quiz2.setWeek(week2.orElseThrow());
//
//        QuizInfo quizInfo1 = new QuizInfo();
//        quizInfo1.setQuiz(quiz1);
//        quizInfo1.setQuizScore(100);
//        quizInfo1.setStudent(student1);
//        quizInfo1.setSubmissionStatus(true); // 학생이 퀴즈 1을 풀었음
//        quizInfo1.setSubmittedAt(LocalDateTime.of(2024, 4, 12, 23, 59));
//        quiz1.setQuizInfos(List.of(quizInfo1));
//
//        QuizInfo quizInfo2 = new QuizInfo();
//        quizInfo2.setQuiz(quiz2);
//        quizInfo2.setStudent(student1);
//        quizInfo2.setSubmissionStatus(false);
//        quizInfo2.setSubmittedAt(null);
//        quiz2.setQuizInfos(List.of(quizInfo2));
//
//        quizService.saveQuiz(quiz1);
//        quizService.saveQuiz(quiz2);
//
//        quizService.saveQuizInfo(quizInfo1);
//        quizService.saveQuizInfo(quizInfo2);
//
//        noticeService.createNotice(lecture1.getId(),"중간고사 공지하겠습니다.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "중간고사에 대해 공지하겠습니다.",NoticeStatus.EXAM);
//        noticeService.createNotice(lecture1.getId(),"4월 12일은 온라인 수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다",NoticeStatus.ONLINE);
//        noticeService.createNotice(lecture1.getId(),"4월 22일은 온라인 수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100,"온라인수업으로 대체합니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(lecture1.getId(),"4월 25일은 대면수업입니다.", "장주찬", LocalDateTime.of(2024, 4, 8, 23, 59), 100,"대면수업으로 대체합니다", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(lecture1.getId(),"기말고사 공지하겠습니다", "장주찬", LocalDateTime.of(2024, 4, 13, 23, 59), 100,"기말고사에 대해 공지하겠습니다.",NoticeStatus.EXAM);
//
//        noticeService.createNotice(lecture2.getId(),"중간고사 공지하겠습니다.1", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100,"중간고사에 대해 공지하겠습니다.", NoticeStatus.EXAM);
//        noticeService.createNotice(lecture2.getId(),"4월 12일은 온라인 수업입니다.2", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(lecture2.getId(),"4월 22일은 온라인 수업입니다.3", "장주찬", LocalDateTime.of(2024, 4, 10, 23, 59), 100, "온라인수업으로 대체합니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(lecture2.getId(),"4월 25일은 대면수업입니다.4", "장주찬", LocalDateTime.of(2024, 4, 8, 23, 59), 100, "대면수업으로 대체합니다", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(lecture2.getId(),"기말고사 공지하겠습니다.", "장주찬", LocalDateTime.of(2024, 4, 13, 23, 59), 100, "기말고사에 대해 공지하겠습니다.", NoticeStatus.EXAM);
//
//        qnAService.createQnA(lecture1.getId(),"이건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//        qnAService.createQnA(lecture1.getId(),"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
//        qnAService.createQnA(lecture1.getId(),"요건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//        qnAService.createQnA(lecture1.getId(),"그건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
//        qnAService.createQnA(lecture1.getId(),"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//
//        qnAService.createQnA(lecture2.getId(),"이건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//        qnAService.createQnA(lecture2.getId(),"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
//        qnAService.createQnA(lecture2.getId(),"요건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//        qnAService.createQnA(lecture2.getId(),"그건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE);
//        qnAService.createQnA(lecture2.getId(),"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED);
//
//        Material material1 = new Material();
//        material1.setTitle("test1");
//        material1.setFileName("0. 스프링 MVC2 전체 목차.pdf");
//        material1.setFilePath("/Users/j_jchani/J_C/jbugs/JBUGS-capstone/server/src/main/resources/static/file/0. 스프링 MVC2 전체 목차.pdf");
//        material1.setWeek(week1.orElseThrow());
//        materialRepository.save(material1);
//
//        VideoMaterial videoMaterial = new VideoMaterial();
//        videoMaterial.setTitle("test1");
//        videoMaterial.setVideoName("0. 스프링 MVC2 전체 목차.pdf");
//        videoMaterial.setVideoPath("/Users/j_jchani/J_C/jbugs/JBUGS-capstone/server/src/main/resources/static/file/video/예제 도메인 모델 - 2편만 듣는 분을 위한 내용.pdf");
//        videoMaterial.setWeek(week1.orElseThrow());
//        videoMaterialRepository.save(videoMaterial);
//
//        ChatRoom chatRoom1 = new ChatRoom();
//        chatRoom1.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"},{\"type\":\"image_url\",\"image_url\":{\"url\":\"quiz_module/chat_img/15_04_08_7050시스템 구조도 설계.png\"}}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"This image appears to be a system architecture diagram involving various technologies including MySQL, Spring, Flask, React, and AWS EC2. The diagram also shows how these components are interconnected. \\n\\nTo provide a bit more detail:\\n- **MySQL** is being used as a database.\\n- **Spring** and **Flask** are being used as backend frameworks. Spring appears to be connected to MySQL, React, AWS EC2, and Flask. Flask, in turn, is connected to two functionalities labeled in Korean: \\\"쿠아드 기반 컴포즈 생성\\\" (Quad-based Compose Creation) and \\\"pdf 내용 기반 컴포즈 생성\\\" (Compose Creation based on PDF content). \\n- **React** is used as a frontend technology, connected to Spring.\\n- **AWS EC2** is used as a cloud computing service to probably host and manage the applications developed with Spring.\\n\\nThis setup indicates a multi-layered application using modern web and cloud technologies where both Spring and Flask might be serving different parts of the application, providing an interface for data interaction via MySQL and user interaction via React.\"}]},{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"이 그림에 대해 설명해줘 \"},{\"type\":\"image_url\",\"image_url\":{\"url\":\"quiz_module/chat_img/15_04_08_7050시스템 구조도 설계.png\"}}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"이 그림은 Spring MVC, WebForm 그리고 Spring Security를 활용한 모바일 애플리케이션 개발에 관한 설명을 담고 있습니다. 주요 내용은 아래와 같습니다:\\n\\n1. **Spring MVC 사용**: 이 도구를 사용하여 어플리케이션의 로직과 뷰를 구현하는 방법을 설명합니다. 사용자 인터페이스(UI)는 X(횡단) 축을 기반으로 구성되며 다양한 데이터를 효과적으로 디스플레이하고 관리하는 것을 목적으로 합니다.\\n\\n2. **디자인과 기능**:\\n   - 스크린 샷들에서는 모바일 화면을 통해 과제 제출과 코스 상세보기 같은 기능을 보여줍니다. \\n   - 사용자는 로그인을 하여 시스템에 접근할 수 있으며, 코스 등록이나 과제 제출과 같은 활동을 할 수 있습니다.\\n\\n3. **데이터베이스 구성**:\\n   - **Courses** 테이블로부터 각각의 과정에 대한 정보(고유 ID, 과목 코드, 명칭, 학점 등)를 관리합니다.\\n   - **Users** 및 **Authorities** 테이블에서는 사용자의 권한과 인증 정보를 관리하며, 이는 Spring Security로 보호됩니다.\\n\\n4. **로그인 및 보안**:\\n   - Spring Security를 활용하여 사용자 인증 및 권한 부여 프로세스를 구현합니다. 예를 들어, `alice`라는 사용자 이름으로 `alice@hansung.ac.kr` 이메일을 사용하여 로그인 할 수 있으며, 해당 사용자에게는 `ROLE_USER` 권한이 부여됩니다.\\n\\n이 이미지는 특히 교육 기관에서의 애플리케이션 사용을 예시로 한 개발 문서 혹은 교육 자료의 일부로 보입니다. 이를 통해 개발자들이 실제 교육 환경에 적용할 수 있는 웹 애플리케이션의 구성과 보안 요소를 이해하는 데 도움을 줄 수 있습니다.\"}]},{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"하이\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"안녕하세요! 무엇을 도와드릴까요?\"}]},{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"안녕하세요\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"안녕하세요! 어떤 질문이나 도움이 필요하신가요?\"}]}]");
//        chatRoom1.setChatRoomName("이름1");
//        chatRoom1.setStudent(student1);
//        ChatRoom chatRoom2 = new ChatRoom();
//        chatRoom2.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"Hello! How can I assist you today? If you have any questions or need information on a specific topic, feel free to ask!\"}]}]");
//        chatRoom2.setChatRoomName("이름2");
//        chatRoom2.setStudent(student1);
//        ChatRoom chatRoom3 = new ChatRoom();
//        chatRoom3.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"Hello! How can I assist you today? If you have any questions or need information on a specific topic, feel free to ask!\"}]}]");
//        chatRoom3.setChatRoomName("이름3");
//        chatRoom3.setStudent(student1);
//        ChatRoom chatRoom4 = new ChatRoom();
//        chatRoom4.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"Hello! How can I assist you today? If you have any questions or need information on a specific topic, feel free to ask!\"}]}]");
//        chatRoom4.setChatRoomName("이름4");
//        chatRoom4.setStudent(student1);
//        ChatRoom chatRoom5 = new ChatRoom();
//        chatRoom5.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"Hello! How can I assist you today? If you have any questions or need information on a specific topic, feel free to ask!\"}]}]");
//        chatRoom5.setChatRoomName("이름5");
//        chatRoom5.setStudent(student1);
//        ChatRoom chatRoom6 = new ChatRoom();
//        chatRoom6.setChattingJson("[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"None\"}]},{\"role\":\"assistant\",\"content\":[{\"type\":\"text\",\"text\":\"Hello! How can I assist you today? If you have any questions or need information on a specific topic, feel free to ask!\"}]}]");
//        chatRoom6.setChatRoomName("이름6");
//        chatRoom6.setStudent(student1);
//
//        chatRepository.save(chatRoom1);
//        chatRepository.save(chatRoom2);
//        chatRepository.save(chatRoom3);
//        chatRepository.save(chatRoom4);
//        chatRepository.save(chatRoom5);
//        chatRepository.save(chatRoom6);
//    }
//}
