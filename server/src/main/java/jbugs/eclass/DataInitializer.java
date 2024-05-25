package jbugs.eclass;

import jbugs.eclass.domain.*;
import jbugs.eclass.repository.*;
import jbugs.eclass.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
    private final MaterialRepository materialRepository;
    private final VideoMaterialRepository videoMaterialRepository;
    private final ChatRepository chatRepository;
    private final LectureRepository lectureRepository;


    @Autowired
    public DataInitializer(MemberService memberService, LectureService lectureService, EnrollmentService enrollmentService, AssignmentService assignmentService, WeekService weekService, PasswordEncoder passwordEncoder, WeekRepository weekRepository, QuizService quizService, NoticeService noticeService, QnAService qnAService, MaterialRepository materialRepository, VideoMaterialRepository videoMaterialRepository, ChatRepository chatRepository, LectureRepository lectureRepository) {
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
        this.materialRepository = materialRepository;
        this.videoMaterialRepository = videoMaterialRepository;
        this.chatRepository = chatRepository;
        this.lectureRepository = lectureRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 테스트 데이터 생성 및 저장
//        Member member1 = new Member();
//        member1.setLoginId("1971233");
//        member1.setName("최재완");
//        String encodedPassword = passwordEncoder.encode("1234!");
//        member1.setPassword(encodedPassword);
//        member1.setMemberType(MemberType.STUDENT);
//
//        Student student1 = new Student();
//        student1.setFirstTrack("모바일소프트웨어트랙");
//        student1.setSecondTrack("웹공학트랙");
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
//        professor1.setLab("연구동 327호");
//
//        member2.setProfessor(professor1);
//        professor1.setMember(member2);
//
//        memberService.join(member2);
//
//        Member member3 = new Member();
//        member3.setLoginId("2222");
//        member3.setName("이재문");
//        String encodedPassword3 = passwordEncoder.encode("1234!");
//        member3.setPassword(encodedPassword3);
//        member3.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor2 = new Professor();
//        professor2.setMajor("컴퓨터공학과");
//        professor2.setEmail("jmlee@hansung.ac.kr");
//        professor2.setLab("연구동 302호");
//
//        member3.setProfessor(professor2);
//        professor2.setMember(member3);
//
//        memberService.join(member3);
//
//        Member member4 = new Member();
//        member4.setLoginId("3333");
//        member4.setName("박승현");
//        String encodedPassword4 = passwordEncoder.encode("1234!");
//        member4.setPassword(encodedPassword4);
//        member4.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor3 = new Professor();
//        professor3.setMajor("컴퓨터공학과");
//        professor3.setEmail("sp@hansung.ac.kr");
//        professor3.setLab("연구동 329호");
//
//        member4.setProfessor(professor3);
//        professor3.setMember(member4);
//
//        memberService.join(member4);
//
//        Member member5 = new Member();
//        member5.setLoginId("4444");
//        member5.setName("황기태");
//        String encodedPassword5 = passwordEncoder.encode("1234!");
//        member5.setPassword(encodedPassword5);
//        member5.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor4 = new Professor();
//        professor4.setMajor("컴퓨터공학과");
//        professor4.setEmail("calafk@hansung.ac.kr");
//        professor4.setLab("연구동 309호");
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
//        professor5.setLab("연구동 305호");
//
//        member6.setProfessor(professor5);
//        professor5.setMember(member6);
//
//        memberService.join(member6);
//
//        Member member7 = new Member();
//        member7.setLoginId("6666");
//        member7.setName("한기준");
//        String encodedPassword7 = passwordEncoder.encode("1234!");
//        member7.setPassword(encodedPassword7);
//        member7.setMemberType(MemberType.PROFESSOR);
//
//        Professor professor6 = new Professor();
//        professor6.setMajor("컴퓨터공학과");
//        professor6.setEmail("keejun.han@hansung.ac.kr");
//        professor6.setLab("연구동 215호");
//
//        member7.setProfessor(professor6);
//        professor6.setMember(member7);
//
//        memberService.join(member7);
//
//        Member member8 = new Member();
//        member8.setLoginId("1971080");
//        member8.setName("장주찬");
//        member8.setPassword(encodedPassword);
//        member8.setMemberType(MemberType.STUDENT);
//        Student student2 = new Student();
//        student2.setFirstTrack("웹공학트랙");
//        student2.setSecondTrack("모바일소프트웨어트랙");
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
//        student3.setFirstTrack("웹공학트랙");
//        student3.setSecondTrack("모바일소프트웨어트랙");
//        member9.setStudent(student3);
//        student3.setMember(member9);
//        memberService.join(member9);
//
//        Lecture lecture1 = new Lecture();
//        lecture1.setName("웹프로그래밍");
//        lecture1.setProfessor(professor1);
//        lecture1.setDivision("A");
//        lecture1.setClassification("전필");
//        lecture1.setLectureTime("월 13 ~ 14.5");
//
//        Lecture lecture2 = new Lecture();
//        lecture2.setName("프로그래밍언어론");
//        lecture2.setProfessor(professor1);
//        lecture2.setDivision("B");
//        lecture2.setClassification("전선");
//        lecture2.setLectureTime("월 10.5 ~ 12");
//
//        Lecture lecture3 = new Lecture();
//        lecture3.setName("캡스톤디자인");
//        lecture3.setProfessor(professor1);
//        lecture3.setDivision("A");
//        lecture3.setClassification("전필");
//        lecture3.setLectureTime("토 9 ~ 12");
//
//        Lecture lecture4 = new Lecture();
//        lecture4.setName("캡스톤디자인");
//        lecture4.setProfessor(professor1);
//        lecture4.setDivision("B");
//        lecture4.setClassification("전필");
//        lecture4.setLectureTime("토 9 ~ 12");
//
//        Lecture lecture5 = new Lecture();
//        lecture5.setName("캡스톤디자인");
//        lecture5.setProfessor(professor1);
//        lecture5.setDivision("O");
//        lecture5.setClassification("전필");
//        lecture5.setLectureTime("토 9 ~ 12");
//
//        Lecture lecture6 = new Lecture();
//        lecture6.setName("Ios프로그래밍");
//        lecture6.setProfessor(professor2);
//        lecture6.setDivision("7");
//        lecture6.setClassification("전필");
//        lecture6.setLectureTime("화 13 ~ 16");
//
//        Lecture lecture7 = new Lecture();
//        lecture7.setName("운영체제");
//        lecture7.setProfessor(professor4);
//        lecture7.setDivision("B");
//        lecture7.setClassification("전선");
//        lecture7.setLectureTime("월 9 ~ 12");
//
//        Lecture lecture8 = new Lecture();
//        lecture8.setName("정보보안");
//        lecture8.setProfessor(professor3);
//        lecture8.setDivision("A");
//        lecture8.setClassification("전선");
//        lecture8.setLectureTime("월 13 ~ 14.5");
//
//        lectureService.saveLecture(lecture1);
//        lectureService.saveLecture(lecture2);
//        lectureService.saveLecture(lecture3);
//        lectureService.saveLecture(lecture4);
//        lectureService.saveLecture(lecture5);
//        lectureService.saveLecture(lecture6);
//        lectureService.saveLecture(lecture7);
//        lectureService.saveLecture(lecture8);
//
//        Enrollment enrollment1 = enrollmentService.enrollStudentInLecture(student1, lecture1);
//        Enrollment enrollment2 = enrollmentService.enrollStudentInLecture(student1, lecture2);
//        Enrollment enrollment3 = enrollmentService.enrollStudentInLecture(student1, lecture3);
//        Enrollment enrollment4 = enrollmentService.enrollStudentInLecture(student1, lecture6);
//        Enrollment enrollment5 = enrollmentService.enrollStudentInLecture(student1, lecture7);
//        Enrollment enrollment6 = enrollmentService.enrollStudentInLecture(student1, lecture8);
//
//        enrollmentService.enrollStudentInLecture(student2, lecture1);
//        enrollmentService.enrollStudentInLecture(student2, lecture2);
//        enrollmentService.enrollStudentInLecture(student2, lecture4);
//        enrollmentService.enrollStudentInLecture(student2, lecture6);
//        enrollmentService.enrollStudentInLecture(student2, lecture7);
//
//        enrollmentService.enrollStudentInLecture(student3, lecture1);
//        enrollmentService.enrollStudentInLecture(student3, lecture2);
//        enrollmentService.enrollStudentInLecture(student3, lecture5);
//        enrollmentService.enrollStudentInLecture(student3, lecture6);
//
//        int memberIndex = 1;
//        String[] studentNames = {"김지훈","박세진", "박서연", "도민준","이하은","장도윤","박지우","이유진","김현우","한수아","신지호", "김예은", "김태현", "김민서", "박준호", "이하윤", "차은우"};
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
//            enrollmentService.enrollStudentInLecture(student5, lecture6);
//            enrollmentService.enrollStudentInLecture(student5, lecture7);
//            enrollmentService.enrollStudentInLecture(student5, lecture8);
//
//            memberIndex++; // 다음 멤버를 위해 인덱스 증가
//        }
//
//        enrollmentService.enrollMemberInLecture(member2, lecture1);
//        enrollmentService.enrollMemberInLecture(member2, lecture2);
//        enrollmentService.enrollMemberInLecture(member2, lecture3);
//        enrollmentService.enrollMemberInLecture(member2, lecture4);
//        enrollmentService.enrollMemberInLecture(member2, lecture5);
//
//        enrollmentService.enrollMemberInLecture(member3, lecture6);
//        enrollmentService.enrollMemberInLecture(member5, lecture7);
//        enrollmentService.enrollMemberInLecture(member4, lecture8);

//        Optional<Week> week1 = weekRepository.findById(1L);
//        Optional<Week> week2 = weekRepository.findById(2L);
//        Optional<Week> week3 = weekRepository.findById(3L);
//        Optional<Week> week4 = weekRepository.findById(20L);
//        Optional<Week> week5 = weekRepository.findById(41L);
//        Optional<Week> week6 = weekRepository.findById(51L);
//        Optional<Week> week7 = weekRepository.findById(68L);
//        Optional<Week> week8 = weekRepository.findById(84L);
//
//        Lecture one = lectureRepository.findOne(1L);
//        Lecture two = lectureRepository.findOne(2L);
//        Lecture three = lectureRepository.findOne(3L);
//        Lecture four = lectureRepository.findOne(4L);
//        Lecture five = lectureRepository.findOne(5L);
//        Lecture six = lectureRepository.findOne(6L);
//        Lecture seven = lectureRepository.findOne(7L);
//        Lecture eight = lectureRepository.findOne(8L);

//        assignmentService.createAssignment(one, 1L, "과제1: 2차시 영상 요약", "2차시(1장~3장) 영상 내용을 html문서 형식으로 요약하세요.", LocalDateTime.of(2024, 3, 14, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 1L, "과제2: 실습문제", "2장\n" + "\n" + "실습문제 4-1\n" + "실습문제 4-2\n" + "\n" + "\n" + "3장\n" + "\n" + "실습문제 2\n" + "실습문제 4", LocalDateTime.of(2024, 3, 14, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 2L, "과제1 : 4장 요약", "", LocalDateTime.of(2024, 3, 21, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 2L, "과제2 : Open Challenge 04", "", LocalDateTime.of(2024, 3, 21, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 3L, "과제1 : 5장 요약", "", LocalDateTime.of(2024, 3, 27, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 3L, "과제2 : 과제2 : 5장 실습파일", "5장\n" + "\n" + "실습문제 4-1, 실습문제 4-2\n" + "실습문제 9", LocalDateTime.of(2024, 3, 27, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 4L, "과제1 : 5차시(6장) 영상 요약", "5차(6장) 영상의 내용을 html 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 4, 4, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 4L, "과제2 : 실습문제(6장)", "Open Challenge 06\n" + "실습문제 6-1, 실습문제 6-2", LocalDateTime.of(2024, 4, 4, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 5L, "과제1 : 7장(자바스크립트 코어 객체와 배열) 영상 요약", "7장 영상의 내용을 웹 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 4, 11, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 5L, "과제2 : 7장(자바스크립트 코어 객체와 배열) 실습문제", "실습문제 4\n" + "실습문제 6\n" + "실습문제 8", LocalDateTime.of(2024, 4, 11, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 6L, "과제1 : 8장(HTML DOM과 Document) 영상 요약", "8장 영상의 내용을 HTML 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 4, 18, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 6L, "과제2 : 8장 실습문제", "실습문제 10-1\n" + "실습문제 10-2", LocalDateTime.of(2024, 4, 18, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 8L, "과제1 : 9장(이벤트 기초 및 활용) 영상 요약", "9장 영상의 내용을 HTML 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 5, 8, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 8L, "과제2 : 실습 해보기", "Open Challenge09 : 마우스 클릭 연습(430page)", LocalDateTime.of(2024, 5, 8, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 9L, "과제1 : 10장, 11장 영상 요약", "10장, 11장 영상의 내용을 HTML 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 5, 15, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 9L, "과제2 : 실습 해보기", "Open Challenge09 : 마우스 클릭 연습(430page)", LocalDateTime.of(2024, 5, 15, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 10L, "과제1 : 12장 영상 요약", "12장 영상의 내용을 HTML 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 5, 23, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 10L, "과제2 : 12장 실습 해보기", "12장 실습문제2 : 세션 스토리지(sessionStorage.html) 응용\n" + "12장 실습문제4 : 로컬 스토리지(일기장)", LocalDateTime.of(2024, 5, 23, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(one, 12L, "과제1 : 13장 영상 요약", "13장 영상의 내용을 HTML5 문서 형식으로 요약하세요.", LocalDateTime.of(2024, 6, 6, 23, 55), AssignmentStatus.NOT_SUBMITTED);
//        assignmentService.createAssignment(one, 12L, "과제2 : 실습 해보기", "Open Challenge 13 : 오디오 리스트 연속 재생", LocalDateTime.of(2024, 6, 6, 23, 55), AssignmentStatus.NOT_SUBMITTED);

//        assignmentService.createAssignment(two, 20L, "과제 1차", "안녕하세요. SW통합연계 수업에 참여한 여러분을 환영합니다.\\n\" + \"\\n\" + \"내년 초에 여러분들이 시험을 볼 SW개발_L5 에 대하여 미리 도움이 될 수있는 과제를 준비했습니다.\\n\" + \"\\n\" + \"\\n\" + \"\\n\" + \"첨부된 공개 모의 시험문제를 확인하시고,  \\n\" + \"\\n\" + \"[제1과제] 영역을 실습한 결과를 제출하시기 바랍니다. \\n\" + \"\\n\" + \"실습 결과는 작업 항목과 함께 아래한글 또는 Word 파일에 화면을 붙여넣으시기 바랍니다.\\n\" + \"\\n\" + \"제출 기한은 중간고사 전까지 입니다. 관련 동영상은 아래 링크를 참고하기 바랍니다.", LocalDateTime.of(2024, 4, 30, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(two, 27L, "과제 2차", "안녕하세요. SW통합연계 수업에 참여한 여러분을 환영합니다.\n" + "\n" + "내년 초에 여러분들이 시험을 볼 SW개발_L5 에 대하여 미리 도움이 될 수있는 과제를 준비했습니다.\n" + "\n" + "\n" + "\n" + "1차 과제시 첨부된 공개 모의 시험문제를 확인하시고,  \n" + "\n" + "[제2과제], [제3과제], [제4과제] 영역을 실습한 결과를 제출하시기 바랍니다. \n" + "\n" + "실습 결과는 작업 항목과 함께 아래한글 또는 Word 파일에 화면을 붙여넣으시기 바랍니다.\n" + "\n" + "제출 기한은 기말고사 전까지 입니다. 관련 동영상은 아래 링크를 참고하기 바랍니다.", LocalDateTime.of(2024, 6, 11, 23, 55), AssignmentStatus.NOT_SUBMITTED);

//        String content1 = "안녕하세요 컴퓨터공학부 실습조교입니다.\n" + "\n" + "책자(작품집) 제작 관련 사항 안내드립니다.\n" + "\n" + " \n" + "\n" + "1. 제출기한 : 5월 17일 (금)\n" + "\n" + "*제출 기한 엄수\n" + "\n" + " \n" + "\n" + "2. 파일 제출 양식\n" + "\n" + "- 1개의 압축 폴더로 제출\n" + "\n" + "- ‘책자 제출’ 과제란에 팀장이 대표로 제출\n" + "\n" + " \n" + "\n" + "- 폴더명 : [0조_팀명_대표자명_대표자연락처_책자.zip]로 제출\n" + "\n" + "(ex. 3조_상상부기_김부기_01012345678_책자.zip)\n" + "\n" + "\n" + "\n" + "폴더 안에는 아래와 같이 정리된 파일이 있어야합니다.\n" + "\n" + "(필수) 1. 0조_캡스톤디자인 책자 내용.hwp\n" + "\n" + "(선택) 2. 0조_이미지_주요 적용 기술 및 구조.jpg\n" + "(선택) 3. 0조_이미지_작품 소개 사진.jpg\n" + "\n" + "(필수) 4. 0조_QR코드.jpg\n" + "\n" + " \n" + "\n" + "1번 필수 책자 내용 양식은 첨부파일에 있는 ‘캡스톤 디자인 책자 내용 양식.hwp’으로 작성하여 제출합니다.\n" + "\n" ;
//        String content2 = "안녕하세요. 컴퓨터공학부입니다.\n" + "\n" + "판넬 제작 관련 안내드립니다. 필독 후 규정에 맞춰 제출해주시기 바랍니다.\n" + "\n" + " \n" + "\n" + "1. 제출 기한 : 5월 24일 (금)\n" + "\n" + "\n" + "\n" + "2. 파일 제출 양식\n" + "\n" + "- 1개의 PDF 파일로 제출\n" + "\n" + "- ‘판넬 제출’ 과제란에 팀장이 대표로 제출\n" + "\n" + "- 파일명 : [0조_팀명_대표자명_대표자연락처_판넬.pdf]로 제출\n" + "\n" + "(ex. 3조_상상부기_김부기_01012345678_판넬.pdf)\n" + "\n" + "\n" + "\n" + "\n" + "3. 파일 양식 (필독)\n" + "\n" + "- 제작 사이즈 : A2 (420*594mm)\n" + "\n" + "- 고화질 PDF, 300dpi 파일로 제출\n" + "\n" + "* jpg, png는 해상도로 인한 인쇄 품질 저하가 있을 수 있음\n" + "\n" + "* ai, psd는 폰트 호환의 문제가 있을 수 있음\n" + "\n" + "* 여백(도련값) 없이 제작\n" + "\n" + "* 이미지 제작 시 포토샵, 일러스트레이터 등을 활용하여 고화질의 이미지로 작업\n" + "\n" + "(ex. A2 / dpi:300으로 설정 / 상하좌우 도련값 없이 제작 / pdf 고품질로 저장)\n";
//        String content3 = "팀장만 제출\n" + "\n" + "[양식][팀명]최종결과물.zip 참고\n" + "\n" + "• 프로젝트 제안서, 최종보고서, 최종발표자료(있을 경우)\n" + "\n" + "• 주간보고서(2-12주차)\n" + "\n" + "• 소스코드(github 주소와 branch/tag를 명시하는 것으로 대체 가능)";

//        assignmentService.createAssignment(three, 36L, "제안서 제출 (3월31알까지)", "팀장만 제출하면 됨", LocalDateTime.of(2024, 4, 1, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(three, 42L, "책자(작품집) 제출 안내(~5/17)", content1, LocalDateTime.of(2024, 5, 17, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(three, 43L, "판넬 제작 파일 제출 안내(~5/24)",content2 , LocalDateTime.of(2024, 5, 24, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(three, 47L, "최종결과물제출 (6/15)", content3, LocalDateTime.of(2024, 6, 16, 00, 00), AssignmentStatus.NOT_SUBMITTED);

//        assignmentService.createAssignment(four, 52L, "제안서 제출 (3월31알까지)", "팀장만 제출하면 됨", LocalDateTime.of(2024, 4, 1, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(four, 58L, "책자(작품집) 제출 안내(~5/17)", content1, LocalDateTime.of(2024, 5, 17, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(four, 59L, "판넬 제작 파일 제출 안내(~5/24)",content2 , LocalDateTime.of(2024, 5, 24, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(four, 63L, "최종결과물제출 (6/15)", content3, LocalDateTime.of(2024, 6, 16, 00, 00), AssignmentStatus.NOT_SUBMITTED);
//        assignmentService.createAssignment(five, 68L, "제안서 제출 (3월31알까지)", "팀장만 제출하면 됨", LocalDateTime.of(2024, 4, 1, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(five, 74L, "책자(작품집) 제출 안내(~5/17)", content1, LocalDateTime.of(2024, 5, 17, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(five, 75L, "판넬 제작 파일 제출 안내(~5/24)",content2 , LocalDateTime.of(2024, 5, 24, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(five, 79L, "최종결과물제출 (6/15)", content3, LocalDateTime.of(2024, 6, 16, 00, 00), AssignmentStatus.NOT_SUBMITTED);

//        assignmentService.createAssignment(six, 83L, "3장 숙제", "3장 숙제\n" + "\n" + "슬라이드 34번과 같이 동작하는 앱 완성\n" + "\n" + "-       프로젝트이름: ch03-학번-이름-conversion // 이름은 반드시 영어로\n" + "\n" + " \n" + "\n" + "숙제업로드\n" + "\n" + "-       프로젝트 전체를 zip하여 업로드\n" + "\n" + "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" + "\n" + "         완성 또는 미완성: 28 슬라이드까지만 완성\n" + "\n" + " \n" + "\n" + "숙제검사\n" + "\n" + "-       ch03-학번-이름-conversion에서 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우 0점처리\n" + "\n" + "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" + "\n" + "-       반드시 대면 수업시 숙제를 가져와야 합니다.", LocalDateTime.of(2024, 3, 17, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 84L, "4장 숙제", "4장 숙제\n" +
//                "\n" +
//                "슬라이드 38번과 같이 동작하는 앱 완성\n" +
//                "\n" +
//                "-       프로젝트이름: ch04-학번-이름-conversion // 이름은 반드시 영어로, conversion 대신에 autolayout로해도 됩니다.\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch04-학번-이름-conversion\" 디렉터리 전체를 zip하여 업로드\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "         완성 또는 미완성: 28 슬라이드까지만 완성 등\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 3, 25, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 85L, "ch05 숙제", "5장 숙제\n" +
//                "\n" +
//                "29 슬라이드에서 실행되는 앱\n" +
//                "\n" +
//                "-       프로젝트이름: ch05-학번-이름-programmingView // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch05-학번-이름-programmingView\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "         (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 4, 1, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 86L, "ch06 숙제", "6장 숙제\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "37 슬라이드에서 실행되는 앱\n" +
//                "\n" +
//                "-       프로젝트이름: ch06-학번-이름-multipleController // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch06-학번-이름-multipleController\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "         (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 4, 8, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 87L, "7장 숙제", "7장 숙제\n" +
//                "\n" +
//                "39 슬라이드에서 실행되는 앱\n" +
//                "\n" +
//                "-       프로젝트이름: ch07-학번-이름-ThreadWebService // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch07-학번-이름-ThreadWebService\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "        (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 4, 15, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 89L, "9장 숙제", "10장 숙제\n" +
//                "\n" +
//                "44 슬라이드에서 실행되는 앱(새로운 도시 삽입이 되는 프로그램까지)\n" +
//                "\n" +
//                "-       프로젝트이름: ch10-학번-이름-MasterDetail // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch10-학번-이름-MasterDetail\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "        (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 4, 29, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 90L, "10장 숙제(5월7일 00:00까지)", "10장 숙제\n" +
//                "\n" +
//                "44 슬라이드에서 실행되는 앱(새로운 도시 삽입이 되는 프로그램까지)\n" +
//                "\n" +
//                "-       프로젝트이름: ch10-학번-이름-MasterDetail // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch10-학번-이름-MasterDetail\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "        (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 5, 7, 00, 00), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(six, 91L, "11장 숙제(5월13일 00:00까지)", "11장 숙제\n" +
//                "\n" +
//                "34 슬라이드에서 실행되는 앱\n" +
//                "\n" +
//                "-       프로젝트이름: ch11-학번-이름-CityFirebase // 이름은 반드시 영어로\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제업로드\n" +
//                "\n" +
//                "-       \"ch11-학번-이름-CityFirebase\" 디렉터리 전체를 zip하여 업로드(공지 사항 참조하여 올바른 디렉터리를 압축하세요)\n" +
//                "\n" +
//                "-       숙제 업로드시 반드시 댓글에 다음 내용을 반드시 작성하여야 합니다. 아래 내용이 없는 경우 미제출로 합니다.\n" +
//                "\n" +
//                "        (완성) 또는 (미완성: xx 슬라이드까지만 완성 등)\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "숙제검사\n" +
//                "\n" +
//                "-       프로젝트 제목의 학번과 이름이 프로젝트내에 숨겨져 있는 학번과 이름이 다른 경우(또는 없는 경우) 0점처리\n" +
//                "\n" +
//                "-       숙제의 특성상 한번만 0점처리되는 경우 이전/이후 모든 숙제점수 0점으로 처리\n" +
//                "\n" +
//                "-       반드시 대면 수업시 숙제를 가져와야함(대면 수업시 활용 또는 검사)", LocalDateTime.of(2024, 5, 13, 00, 00), AssignmentStatus.SUBMITTED);

//        assignmentService.createAssignment(seven, 97L, "1주차 과제", "1주차 과제입니다.\n" +
//                "\n" +
//                "과제를 보면서 1장을 학습하면 좋습니다.\n" +
//                "\n" +
//                "어떤 내용을 명확히 숙지해야 하는지 알 수 있습니다.\n" +
//                "\n" +
//                "과제 제출 요령은 공지사항을 참고 하세요.", LocalDateTime.of(2024, 3, 14, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 98L, "2주차 과제", "", LocalDateTime.of(2024, 3, 21, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 99L, "3주차 과제", "2장의 하반부가 여러분에게 조금 벅찰 수 있습니다.\n" +
//                "\n" +
//                "그래도 열심히 하세요.", LocalDateTime.of(2024, 3, 27, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 100L, "4주차 과제", "장 프로세스를 학습합니다.\n" +
//                "\n" +
//                "작년에 비해 문제의 수를 많이 줄였습니다.\n" +
//                "\n" +
//                "간단한 코딩 문제가 있습니다. 본문의 예제들을 잘 이해하면 쉽게 풀 수 있는 문제입니다.", LocalDateTime.of(2024, 4, 4, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 101L, "과제 5 -4장 스레드와 멀티스레딩", "4장 과제", LocalDateTime.of(2024, 4, 11, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 102L, "과제 6 -5장 CPU 스케줄링", "문제의 수를 작년보자 줄였습니다.\n" +
//                "\n" +
//                "복습하는 것으로 생각하고 과제에 성실하게 하세요.", LocalDateTime.of(2024, 4, 18, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 105L, "9주차 - 7장 교착상태 과제", "7장 과제", LocalDateTime.of(2024, 5, 8, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 106L, "10주차 과제", "8장 과제", LocalDateTime.of(2024, 5, 15, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 107L, "11주차 과제 - 9장 학습", "9장 과제", LocalDateTime.of(2024, 5, 23, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 108L, "12주차 - 10장 가상 메모리의 과제입니다.", "10장 과제", LocalDateTime.of(2024, 5, 30, 23, 55), AssignmentStatus.SUBMITTED);
//        assignmentService.createAssignment(seven, 109L, "13주차 11장 파일 시스템 과제", "마지막 과제입니다.\n" +
//                "\n" +
//                "그동안 과제하느라 애 많이 썼습니다.", LocalDateTime.of(2024, 6, 6, 23, 55), AssignmentStatus.SUBMITTED);

//        assignmentService.createAssignment(eight, 117L, "5주차 과제: 보안사고 조사 리포트 (~4/9일, 23:55)", "최근 10년 이내, 국내외 발생한 대형 해킹사례를 조사하고, 그 중 하나를 선정하여 보안사고 조사 리포트를 작성합니다. (배점 10점) \n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "# 분량 및 제출기한\n" +
//                "\n" +
//                "- 분량: 워드 (A4 10매 이내) 또는 프리젠테이션 (슬라이드 30P 이내) 중 택 1하여 작성\n" +
//                "\n" +
//                "- 기한: 4/9 (일) ~23:55", LocalDateTime.of(2024, 4, 9, 23, 55), AssignmentStatus.SUBMITTED);
//
//        assignmentService.createAssignment(eight, 125L, "과제2: OWASP Top 10 - (A7) Identity & Auth Failure", "OWASP Top 10 중 (A7) Identity & Auth Failure 중 일부를 실습하고, Insecure Login와 Secure Passwords 문항에 대한 실습결과 리포트를 작성합니다. (배점 10점)", LocalDateTime.of(2024, 6, 6, 23, 55), AssignmentStatus.SUBMITTED);


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
//        quiz1.setLecture(lecture1);
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
//        quiz2.setLecture(lecture1);
//
//        QuizInfo quizInfo1 = new QuizInfo();
//        quizInfo1.setQuiz(quiz1);
//        quizInfo1.setQuizScore(100);
//        quizInfo1.setStudent(student1);
//        quizInfo1.setSubmissionStatus(true); // 학생이 퀴즈 1을 풀었음
//        quizInfo1.setSubmittedAt(LocalDateTime.of(2024, 4, 12, 23, 59));
//        quizInfo1.setEnrollment(enrollment1);
//        quiz1.setQuizInfos(List.of(quizInfo1));
//
//        QuizInfo quizInfo2 = new QuizInfo();
//        quizInfo2.setQuiz(quiz2);
//        quizInfo2.setStudent(student1);
//        quizInfo2.setSubmissionStatus(false);
//        quizInfo2.setSubmittedAt(null);
//        quizInfo1.setEnrollment(enrollment1);
//        quiz2.setQuizInfos(List.of(quizInfo2));
//
//        quizService.saveQuiz(quiz1);
//        quizService.saveQuiz(quiz2);
//
//        quizService.saveQuizInfo(quizInfo1);
//        quizService.saveQuizInfo(quizInfo2);

//        noticeService.createNotice(1L,"자바 모르는 수강생은 8주차까지 독학완료", "김성동", LocalDateTime.of(2024, 2, 28, 13, 46), 67, "수업계획서에 있는대로\n" + "\n" + "객체지향 프로그래밍2 (자바)를 알고 있어야 9주차부터 이 과목을 수강할 수 있습니다.\n" + "\n" + "8주차까지 자바 독학 완료바랍니다.\n" + "\n" + "9주차부터 자바를 알고 있다는 가정하에 서버구현부분 강의 진행합니다.",NoticeStatus.EXAM);
//        noticeService.createNotice(1L,"4월10일 공휴일 휴강안내", "김성동", LocalDateTime.of(2024, 4, 3, 13, 29), 52, "4월10일은 선거일로, 학교방침에 따라 휴강됨을 알려드립니다\n" + "\n" + "보강일(중간고사)은 9주차에 진행이되며,\n" + "\n" + "인터페이스수업은 1주~9주차 종료됩니다 ",NoticeStatus.ONLINE);
//        noticeService.createNotice(1L,"수업관련문의안내", "김성동", LocalDateTime.of(2024, 4, 12, 18, 3), 61,"수업관련하여\n" + "\n" + "추후 출결/성적등의 문의시 다른 채널을 활용할 경우 누락이 될 수 있음으로 \n" + "\n" + "반드시 이클래스 내에서 ■메세지■를 이용해주시기바랍니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(1L,"6주차(선거일)휴강 보강일 안내", "김성동", LocalDateTime.of(2024, 5, 1, 15, 30), 35,"6주차(선거일)휴강으로 인한 보강일은 16주차(6월 19일)입니다 \n" + "\n" + "16주차에 출석하면, 6주차 출결이 인정됩니다 \n", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(1L,"코딩시험 2022년 기출문제", "김성동", LocalDateTime.of(2024, 5, 2, 14, 8), 36,"2022년 중간시험과 기말시험 기출문제 첨부합니다\n" + "\n" + "시험문제와 뼈대코드를 보고 답안지를 작성합니다.\n" + "\n" + "해답코드도 첨부하였습니다.",NoticeStatus.EXAM);
//
//        noticeService.createNotice(2L,"휴강 안내 - 6주차", "김성동", LocalDateTime.of(2024, 4, 7, 14, 15), 77,"강사 개인 사정으로 6주차 수업은 휴강합니다.\n" + "\n" + "해당 강의는 16주차에 보강을 진행할 예정입니다.", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(2L,"예비군 훈련 소집 대상자 출석 처리 안내", "김성동", LocalDateTime.of(2024, 4, 15, 20, 58), 78, "예비군 훈련 소집 대상자의 경우 출석을 인정합니다. 단, 예비군 훈련 소집 및 참석을 증명할 수 있는 서류를 제출하여야 함을 명심하십시오.\n" + "\n" + "\n" + "\n" + "아울러 중간고사는 8주차에 정상적으로 시행합니다. \n" + "\n" + "\n" + "\n" + "시험에 대한 안내는 이번 7주차 수업 시간 중에 안내할 것입니다. 예비군 훈련으로 수업에 참여하지 못한 분들은 7주차 수업을 참여한 다른 학우분들로부터 시험에 관련한 정보를 전달받기를 바랍니다.\n" + "\n", NoticeStatus.ONLINE);
//        noticeService.createNotice(2L,"중간고사 안내", "김성동", LocalDateTime.of(2024, 4, 16, 10, 16), 130, "8주차에 중간고사를 실시합니다.\n" + "\n" + "\n" + "\n" + "시험 시간은 수업시간과 동일하며, 총 5 문제에 대하여 서술형으로 출제됩니다.\n" + "\n" + "\n" + "\n" + "범위는 1주차부터 7주차까지 진행한 강의 내용 에서 출제될 예정이며, \n" + "\n" + "\n" + "\n" + "특히, 요구분석, 데이터베이스 관련 이론 및 SQL 기본 및 응용에서 주로 다루어질 예정입니다.\n" + "\n", NoticeStatus.EXAM);
//        noticeService.createNotice(2L,"기말고사 공지하겠습니다.", "김성동", LocalDateTime.of(2024, 4, 13, 23, 59), 100, "기말고사에 대해 공지하겠습니다.", NoticeStatus.EXAM);

//        noticeService.createNotice(3L,"모바일 관련 주제로 도움 원하는 팀 보세요.", "김성동", LocalDateTime.of(2024, 2, 24, 7, 30), 418, "예전에 소프트웨어 마에스트로 멘토할 때 만났던 전문가 분입니다. 저한테 보내온 메일을 올리니까 살펴보고 관심 있는 팀은 연락해보세요.\n" + "\n" + "---------------------------------------------------------\n" + "\n" + "안녕하세요! 모바일앱개발협동조합 최원서 입니다.\n" + "\n" + "\n" + "\n" + "저희 회사 캡스톤 프로젝트(https://url.kr/9iv471)10개를 제안드립니다. \n", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"팀 구성 도움 조사 입력한 사람들 필독!", "김성동", LocalDateTime.of(2024, 2, 26, 13, 41), 416, "원하는 분야에 따라 팀을 만들어서 메일을 보냈으니,\n" + "메일 확인하고 최대한 빨리 서로 연락하여 팀 구성 완료한 후,\n" + "\n" + "팀구성 sheet에 입력하기 바랍니다.\n" + "\n" + "다음주는 개강입니다. 시간이 별로 없으니, 메일 빨리 확인하고 얼른 시작하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"오픈채팅방 개설", "김성동", LocalDateTime.of(2024, 2, 26, 13, 46), 272, "오픈채팅방을 개설했습니다. 수업 관련한 질문,건의 등 어떤 것도 좋습니다.\n" + "\n" + "실명은 쓰지 않아도 됩니다만, 이름이 겹치지 않도록 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"아래 4번 게시글, 모바일 주제 도움 관련하여 프로젝트 추가되었네요", "김성동", LocalDateTime.of(2024, 2, 29, 13, 18), 343, "[프로젝트 리스트]\n" + "\n" + "1. 빅데이터 기반 이미지 편집 온라인 솔루션(HTML5)\n" + "\n" + "2. 자신이 주인공이 되는 AR 기반 동화 앱서비스 개발\n" + "\n" + "3. AI 기반 무인관리 시스템 개발\n" + "\n" + "4. 메타버스 기반 채팅 플랫폼\n" + "\n" + "5. AR 증강현실을 활용한 가구 인테리어 시스템", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"팀 구성 도움2차.. (마지막 기회임)", "김성동", LocalDateTime.of(2024, 3, 3, 18, 30), 350, "팀 구성 도움이 필요한 사람은 3월5일까지 입력하세요.\n" + "\n" + "마지막 기회입니다.\n" + "\n" + "2주차 시작에도 팀구성이 안된사람은 수강 불가입니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"팀 구성 도움 완료. (메일 확인 바람)", "김성동", LocalDateTime.of(2024, 3, 6, 00, 26), 273, "2차 팀구성 도움 설문 입력한 사람들은\n" + "\n" + "방금 팀 구성해서 메일 보냈으니, 확인하여 연락하고, 팀 구성 마무리 하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"지도교수 임의 배정", "김성동", LocalDateTime.of(2024, 3, 6, 1, 12), 337, "팀 구성 시트에 지도교수 칸이 비어 있는 팀들에대해\n" + "\n" + "임의로 지도교수님 이름을 파란색으로 써놨습니다.\n" + "\n" + "배정 받은 지도교수님께 연락하여 확정하기 바랍니다.\n" + "\n" + "확정된 팀은 지도교수님 이름 색을 검정색으로 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"토요일 대면 수업은 없습니다.", "김성동", LocalDateTime.of(2024, 3, 8, 11, 39), 246, "캡스톤디자인 토요일 대면 수업은 하지 않습니다.\n" + "\n" + "지도교수님과 별도로 약속잡아 미팅하면 됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"캡스톤디자인 지원금 관련", "김성동", LocalDateTime.of(2024, 3, 11, 10, 31), 647, "캡스톤디자인 지원금을 받기 위한 운영 절차 및 지침 등 입니다.\n" + "\n" + "캡스톤 시스템에 프로젝트 개설 부터 해야 하고, 지도교수님 이름으로 해야 함. (주관 교수인 내가 아니라 팀 지도 교수님 성함)\n" + "\n" + "학생 대상 캡스톤디자인 설명회는 3.20.(수), 21.(목) 양일간 14:00부터 DLC에서 진행될 예정이니\n" + "\n" + "팀별로 최소 1명은 꼭 참석하여 설명 듣길 권장합니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"학과 보유 장비 목록 (3/19 업데이트)", "김성동", LocalDateTime.of(2024, 3, 12, 10, 25), 423, "장비 구매 전 확인 바라며,대여시 꼭 캡스톤 디자인으로 대여한다고 말씀 해주세요.\n" + "\n" + "대여한 장비는 캡스톤 디자인 종료 후, 모두 반납해야 합니다. \n" + "\n" + "대여장소: 공학관A동 104호 실습조교실 \n" + "\n" + "대여시간: 평일 09:00~17:30 (주말, 공휴일 / 점심시간 12:00~13:00 제외)", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"3/12(화요일) A동 104호에서 갤럭시탭[26], 라즈베리파이키트[30]을 대여해간 학생을 찾습니다.", "김성동", LocalDateTime.of(2024, 3, 14, 17, 9), 367, "캡스톤 디자인으로 12일 화요일날 공학관 A동 104호 실습시무실 방문하여 갤럭시탭과 라즈베리파이 키트를 대여해간 학생을 찾고있습니다.\n" + "\n" + "\n" + "\n" + "해당 학생은 장부에 학생 정보를 기입하지 않아 본인 확인이 어렵습니다.\n" + "\n" + "서류 보완 요청드리니 실습사무실에 최대한 빨리 방문하여주시길 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"캡스톤디자인 시설물 사전조사 ((5/9까지 등록 요함))", "김성동", LocalDateTime.of(2024, 5, 8, 12, 50), 593, "1. 위 공유파일 ‘팀확인용(수정금지)’ 시트의 ①팀번호 ➁팀이름 확인하여\n" + "\n" + "  ‘시설물 사전조사’ 시트에 본인의 팀번호와 팀이름을 적습니다. (다른 팀번호칸에 잘못입력했는지 확인)\n" + "\n" + "-> 아직 적지 않은 팀은 정해진 기간내에 작성 해주세요\n" + "\n" + " \n" + "\n" + "2. 팀장들은 본인 이름 옆 괄호 안에 자신의 학번을 작성합니다.\n" + "\n" + "예시) 홍길동(241212)\n" + "\n", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"캡스톤 발표, 영상, 성적 관련 안내.", "김성동", LocalDateTime.of(2024, 5, 20, 17, 22), 384, "5월31일 작품 발표회에는\n" + "\n" + "작품 전시하고 설명하면 됩니다. 그리고 동영상을 제작한 팀이 있다면 그날 작품 전시하면서 재생하면 됩니다.\n" + "\n" + "그리고 github 저장소 README.md에 영상 링크를 넣어두세요.\n" + "\n" + "성적은 지도교수님이 주관적으로 결정하십니다. 작품 발표회때 평가는 1,2,3등 수상자 선발에만 사용됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(3L,"5/31 캡스톤디자인 상세 일정 및 모바일초대장 안내 (배치도 추가 공지)", "김성동", LocalDateTime.of(2024, 5, 23, 17, 10), 295, "[모바일 초대장 링크]\n" + "\n" + "http://spix.denod.co.kr/event/0514hsu/\n" + "\n" + " \n" + "\n" + "초대하실 지인분들게 초대장 공유 해주시면 됩니다.", NoticeStatus.ONLINE);
//
//        noticeService.createNotice(4L,"모바일 관련 주제로 도움 원하는 팀 보세요.", "김성동", LocalDateTime.of(2024, 2, 24, 7, 30), 418, "예전에 소프트웨어 마에스트로 멘토할 때 만났던 전문가 분입니다. 저한테 보내온 메일을 올리니까 살펴보고 관심 있는 팀은 연락해보세요.\n" + "\n" + "---------------------------------------------------------\n" + "\n" + "안녕하세요! 모바일앱개발협동조합 최원서 입니다.\n" + "\n" + "\n" + "\n" + "저희 회사 캡스톤 프로젝트(https://url.kr/9iv471)10개를 제안드립니다. \n", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"팀 구성 도움 조사 입력한 사람들 필독!", "김성동", LocalDateTime.of(2024, 2, 26, 13, 41), 416, "원하는 분야에 따라 팀을 만들어서 메일을 보냈으니,\n" + "메일 확인하고 최대한 빨리 서로 연락하여 팀 구성 완료한 후,\n" + "\n" + "팀구성 sheet에 입력하기 바랍니다.\n" + "\n" + "다음주는 개강입니다. 시간이 별로 없으니, 메일 빨리 확인하고 얼른 시작하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"오픈채팅방 개설", "김성동", LocalDateTime.of(2024, 2, 26, 13, 46), 272, "오픈채팅방을 개설했습니다. 수업 관련한 질문,건의 등 어떤 것도 좋습니다.\n" + "\n" + "실명은 쓰지 않아도 됩니다만, 이름이 겹치지 않도록 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"아래 4번 게시글, 모바일 주제 도움 관련하여 프로젝트 추가되었네요", "김성동", LocalDateTime.of(2024, 2, 29, 13, 18), 343, "[프로젝트 리스트]\n" + "\n" + "1. 빅데이터 기반 이미지 편집 온라인 솔루션(HTML5)\n" + "\n" + "2. 자신이 주인공이 되는 AR 기반 동화 앱서비스 개발\n" + "\n" + "3. AI 기반 무인관리 시스템 개발\n" + "\n" + "4. 메타버스 기반 채팅 플랫폼\n" + "\n" + "5. AR 증강현실을 활용한 가구 인테리어 시스템", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"팀 구성 도움2차.. (마지막 기회임)", "김성동", LocalDateTime.of(2024, 3, 3, 18, 30), 350, "팀 구성 도움이 필요한 사람은 3월5일까지 입력하세요.\n" + "\n" + "마지막 기회입니다.\n" + "\n" + "2주차 시작에도 팀구성이 안된사람은 수강 불가입니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"팀 구성 도움 완료. (메일 확인 바람)", "김성동", LocalDateTime.of(2024, 3, 6, 00, 26), 273, "2차 팀구성 도움 설문 입력한 사람들은\n" + "\n" + "방금 팀 구성해서 메일 보냈으니, 확인하여 연락하고, 팀 구성 마무리 하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"지도교수 임의 배정", "김성동", LocalDateTime.of(2024, 3, 6, 1, 12), 337, "팀 구성 시트에 지도교수 칸이 비어 있는 팀들에대해\n" + "\n" + "임의로 지도교수님 이름을 파란색으로 써놨습니다.\n" + "\n" + "배정 받은 지도교수님께 연락하여 확정하기 바랍니다.\n" + "\n" + "확정된 팀은 지도교수님 이름 색을 검정색으로 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"토요일 대면 수업은 없습니다.", "김성동", LocalDateTime.of(2024, 3, 8, 11, 39), 246, "캡스톤디자인 토요일 대면 수업은 하지 않습니다.\n" + "\n" + "지도교수님과 별도로 약속잡아 미팅하면 됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"캡스톤디자인 지원금 관련", "김성동", LocalDateTime.of(2024, 3, 11, 10, 31), 647, "캡스톤디자인 지원금을 받기 위한 운영 절차 및 지침 등 입니다.\n" + "\n" + "캡스톤 시스템에 프로젝트 개설 부터 해야 하고, 지도교수님 이름으로 해야 함. (주관 교수인 내가 아니라 팀 지도 교수님 성함)\n" + "\n" + "학생 대상 캡스톤디자인 설명회는 3.20.(수), 21.(목) 양일간 14:00부터 DLC에서 진행될 예정이니\n" + "\n" + "팀별로 최소 1명은 꼭 참석하여 설명 듣길 권장합니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"학과 보유 장비 목록 (3/19 업데이트)", "김성동", LocalDateTime.of(2024, 3, 12, 10, 25), 423, "장비 구매 전 확인 바라며,대여시 꼭 캡스톤 디자인으로 대여한다고 말씀 해주세요.\n" + "\n" + "대여한 장비는 캡스톤 디자인 종료 후, 모두 반납해야 합니다. \n" + "\n" + "대여장소: 공학관A동 104호 실습조교실 \n" + "\n" + "대여시간: 평일 09:00~17:30 (주말, 공휴일 / 점심시간 12:00~13:00 제외)", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"3/12(화요일) A동 104호에서 갤럭시탭[26], 라즈베리파이키트[30]을 대여해간 학생을 찾습니다.", "김성동", LocalDateTime.of(2024, 3, 14, 17, 9), 367, "캡스톤 디자인으로 12일 화요일날 공학관 A동 104호 실습시무실 방문하여 갤럭시탭과 라즈베리파이 키트를 대여해간 학생을 찾고있습니다.\n" + "\n" + "\n" + "\n" + "해당 학생은 장부에 학생 정보를 기입하지 않아 본인 확인이 어렵습니다.\n" + "\n" + "서류 보완 요청드리니 실습사무실에 최대한 빨리 방문하여주시길 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"캡스톤디자인 시설물 사전조사 ((5/9까지 등록 요함))", "김성동", LocalDateTime.of(2024, 5, 8, 12, 50), 593, "1. 위 공유파일 ‘팀확인용(수정금지)’ 시트의 ①팀번호 ➁팀이름 확인하여\n" + "\n" + "  ‘시설물 사전조사’ 시트에 본인의 팀번호와 팀이름을 적습니다. (다른 팀번호칸에 잘못입력했는지 확인)\n" + "\n" + "-> 아직 적지 않은 팀은 정해진 기간내에 작성 해주세요\n" + "\n" + " \n" + "\n" + "2. 팀장들은 본인 이름 옆 괄호 안에 자신의 학번을 작성합니다.\n" + "\n" + "예시) 홍길동(241212)\n" + "\n", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"캡스톤 발표, 영상, 성적 관련 안내.", "김성동", LocalDateTime.of(2024, 5, 20, 17, 22), 384, "5월31일 작품 발표회에는\n" + "\n" + "작품 전시하고 설명하면 됩니다. 그리고 동영상을 제작한 팀이 있다면 그날 작품 전시하면서 재생하면 됩니다.\n" + "\n" + "그리고 github 저장소 README.md에 영상 링크를 넣어두세요.\n" + "\n" + "성적은 지도교수님이 주관적으로 결정하십니다. 작품 발표회때 평가는 1,2,3등 수상자 선발에만 사용됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(4L,"5/31 캡스톤디자인 상세 일정 및 모바일초대장 안내 (배치도 추가 공지)", "김성동", LocalDateTime.of(2024, 5, 23, 17, 10), 295, "[모바일 초대장 링크]\n" + "\n" + "http://spix.denod.co.kr/event/0514hsu/\n" + "\n" + " \n" + "\n" + "초대하실 지인분들게 초대장 공유 해주시면 됩니다.", NoticeStatus.ONLINE);
//
//        noticeService.createNotice(5L,"모바일 관련 주제로 도움 원하는 팀 보세요.", "김성동", LocalDateTime.of(2024, 2, 24, 7, 30), 418, "예전에 소프트웨어 마에스트로 멘토할 때 만났던 전문가 분입니다. 저한테 보내온 메일을 올리니까 살펴보고 관심 있는 팀은 연락해보세요.\n" + "\n" + "---------------------------------------------------------\n" + "\n" + "안녕하세요! 모바일앱개발협동조합 최원서 입니다.\n" + "\n" + "\n" + "\n" + "저희 회사 캡스톤 프로젝트(https://url.kr/9iv471)10개를 제안드립니다. \n", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"팀 구성 도움 조사 입력한 사람들 필독!", "김성동", LocalDateTime.of(2024, 2, 26, 13, 41), 416, "원하는 분야에 따라 팀을 만들어서 메일을 보냈으니,\n" + "메일 확인하고 최대한 빨리 서로 연락하여 팀 구성 완료한 후,\n" + "\n" + "팀구성 sheet에 입력하기 바랍니다.\n" + "\n" + "다음주는 개강입니다. 시간이 별로 없으니, 메일 빨리 확인하고 얼른 시작하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"오픈채팅방 개설", "김성동", LocalDateTime.of(2024, 2, 26, 13, 46), 272, "오픈채팅방을 개설했습니다. 수업 관련한 질문,건의 등 어떤 것도 좋습니다.\n" + "\n" + "실명은 쓰지 않아도 됩니다만, 이름이 겹치지 않도록 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"아래 4번 게시글, 모바일 주제 도움 관련하여 프로젝트 추가되었네요", "김성동", LocalDateTime.of(2024, 2, 29, 13, 18), 343, "[프로젝트 리스트]\n" + "\n" + "1. 빅데이터 기반 이미지 편집 온라인 솔루션(HTML5)\n" + "\n" + "2. 자신이 주인공이 되는 AR 기반 동화 앱서비스 개발\n" + "\n" + "3. AI 기반 무인관리 시스템 개발\n" + "\n" + "4. 메타버스 기반 채팅 플랫폼\n" + "\n" + "5. AR 증강현실을 활용한 가구 인테리어 시스템", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"팀 구성 도움2차.. (마지막 기회임)", "김성동", LocalDateTime.of(2024, 3, 3, 18, 30), 350, "팀 구성 도움이 필요한 사람은 3월5일까지 입력하세요.\n" + "\n" + "마지막 기회입니다.\n" + "\n" + "2주차 시작에도 팀구성이 안된사람은 수강 불가입니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"팀 구성 도움 완료. (메일 확인 바람)", "김성동", LocalDateTime.of(2024, 3, 6, 00, 26), 273, "2차 팀구성 도움 설문 입력한 사람들은\n" + "\n" + "방금 팀 구성해서 메일 보냈으니, 확인하여 연락하고, 팀 구성 마무리 하기 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"지도교수 임의 배정", "김성동", LocalDateTime.of(2024, 3, 6, 1, 12), 337, "팀 구성 시트에 지도교수 칸이 비어 있는 팀들에대해\n" + "\n" + "임의로 지도교수님 이름을 파란색으로 써놨습니다.\n" + "\n" + "배정 받은 지도교수님께 연락하여 확정하기 바랍니다.\n" + "\n" + "확정된 팀은 지도교수님 이름 색을 검정색으로 바꿔주세요.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"토요일 대면 수업은 없습니다.", "김성동", LocalDateTime.of(2024, 3, 8, 11, 39), 246, "캡스톤디자인 토요일 대면 수업은 하지 않습니다.\n" + "\n" + "지도교수님과 별도로 약속잡아 미팅하면 됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"캡스톤디자인 지원금 관련", "김성동", LocalDateTime.of(2024, 3, 11, 10, 31), 647, "캡스톤디자인 지원금을 받기 위한 운영 절차 및 지침 등 입니다.\n" + "\n" + "캡스톤 시스템에 프로젝트 개설 부터 해야 하고, 지도교수님 이름으로 해야 함. (주관 교수인 내가 아니라 팀 지도 교수님 성함)\n" + "\n" + "학생 대상 캡스톤디자인 설명회는 3.20.(수), 21.(목) 양일간 14:00부터 DLC에서 진행될 예정이니\n" + "\n" + "팀별로 최소 1명은 꼭 참석하여 설명 듣길 권장합니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"학과 보유 장비 목록 (3/19 업데이트)", "김성동", LocalDateTime.of(2024, 3, 12, 10, 25), 423, "장비 구매 전 확인 바라며,대여시 꼭 캡스톤 디자인으로 대여한다고 말씀 해주세요.\n" + "\n" + "대여한 장비는 캡스톤 디자인 종료 후, 모두 반납해야 합니다. \n" + "\n" + "대여장소: 공학관A동 104호 실습조교실 \n" + "\n" + "대여시간: 평일 09:00~17:30 (주말, 공휴일 / 점심시간 12:00~13:00 제외)", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"3/12(화요일) A동 104호에서 갤럭시탭[26], 라즈베리파이키트[30]을 대여해간 학생을 찾습니다.", "김성동", LocalDateTime.of(2024, 3, 14, 17, 9), 367, "캡스톤 디자인으로 12일 화요일날 공학관 A동 104호 실습시무실 방문하여 갤럭시탭과 라즈베리파이 키트를 대여해간 학생을 찾고있습니다.\n" + "\n" + "\n" + "\n" + "해당 학생은 장부에 학생 정보를 기입하지 않아 본인 확인이 어렵습니다.\n" + "\n" + "서류 보완 요청드리니 실습사무실에 최대한 빨리 방문하여주시길 바랍니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"캡스톤디자인 시설물 사전조사 ((5/9까지 등록 요함))", "김성동", LocalDateTime.of(2024, 5, 8, 12, 50), 593, "1. 위 공유파일 ‘팀확인용(수정금지)’ 시트의 ①팀번호 ➁팀이름 확인하여\n" + "\n" + "  ‘시설물 사전조사’ 시트에 본인의 팀번호와 팀이름을 적습니다. (다른 팀번호칸에 잘못입력했는지 확인)\n" + "\n" + "-> 아직 적지 않은 팀은 정해진 기간내에 작성 해주세요\n" + "\n" + " \n" + "\n" + "2. 팀장들은 본인 이름 옆 괄호 안에 자신의 학번을 작성합니다.\n" + "\n" + "예시) 홍길동(241212)\n" + "\n", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"캡스톤 발표, 영상, 성적 관련 안내.", "김성동", LocalDateTime.of(2024, 5, 20, 17, 22), 384, "5월31일 작품 발표회에는\n" + "\n" + "작품 전시하고 설명하면 됩니다. 그리고 동영상을 제작한 팀이 있다면 그날 작품 전시하면서 재생하면 됩니다.\n" + "\n" + "그리고 github 저장소 README.md에 영상 링크를 넣어두세요.\n" + "\n" + "성적은 지도교수님이 주관적으로 결정하십니다. 작품 발표회때 평가는 1,2,3등 수상자 선발에만 사용됩니다.", NoticeStatus.ONLINE);
//        noticeService.createNotice(5L,"5/31 캡스톤디자인 상세 일정 및 모바일초대장 안내 (배치도 추가 공지)", "김성동", LocalDateTime.of(2024, 5, 23, 17, 10), 295, "[모바일 초대장 링크]\n" + "\n" + "http://spix.denod.co.kr/event/0514hsu/\n" + "\n" + " \n" + "\n" + "초대하실 지인분들게 초대장 공유 해주시면 됩니다.", NoticeStatus.ONLINE);
//
//        noticeService.createNotice(6L,"자바 모르는 수강생은 8주차까지 독학완료", "이재문", LocalDateTime.of(2024, 2, 28, 13, 46), 67, "수업계획서에 있는대로\n" + "\n" + "객체지향 프로그래밍2 (자바)를 알고 있어야 9주차부터 이 과목을 수강할 수 있습니다.\n" + "\n" + "8주차까지 자바 독학 완료바랍니다.\n" + "\n" + "9주차부터 자바를 알고 있다는 가정하에 서버구현부분 강의 진행합니다.",NoticeStatus.EXAM);
//        noticeService.createNotice(6L,"4월10일 공휴일 휴강안내", "이재문", LocalDateTime.of(2024, 4, 3, 13, 29), 52, "4월10일은 선거일로, 학교방침에 따라 휴강됨을 알려드립니다\n" + "\n" + "보강일(중간고사)은 9주차에 진행이되며,\n" + "\n" + "인터페이스수업은 1주~9주차 종료됩니다 ",NoticeStatus.ONLINE);
//        noticeService.createNotice(6L,"수업관련문의안내", "이재문", LocalDateTime.of(2024, 4, 12, 18, 3), 61,"수업관련하여\n" + "\n" + "추후 출결/성적등의 문의시 다른 채널을 활용할 경우 누락이 될 수 있음으로 \n" + "\n" + "반드시 이클래스 내에서 ■메세지■를 이용해주시기바랍니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(6L,"중간고사", "이재문", LocalDateTime.of(2024, 4, 21, 6, 28), 258,"1. 필기시험\n" + "\n" + "     * 총15문제(객관식12문제, 주관식 3문제)\n" + "\n" + "2. 실기시험\n" + "\n" + "      * 4-5문제\n" + "\n" + "* 필시실기 전부 closed book입니다.", NoticeStatus.EXAM);
//        noticeService.createNotice(6L,"6주차(선거일)휴강 보강일 안내", "이재문", LocalDateTime.of(2024, 5, 1, 15, 30), 35,"6주차(선거일)휴강으로 인한 보강일은 16주차(6월 19일)입니다 \n" + "\n" + "16주차에 출석하면, 6주차 출결이 인정됩니다 \n", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(6L,"코딩시험 2022년 기출문제", "이재문", LocalDateTime.of(2024, 5, 2, 14, 8), 36,"2022년 중간시험과 기말시험 기출문제 첨부합니다\n" + "\n" + "시험문제와 뼈대코드를 보고 답안지를 작성합니다.\n" + "\n" + "해답코드도 첨부하였습니다.",NoticeStatus.EXAM);
//
//        noticeService.createNotice(7L,"자바 모르는 수강생은 8주차까지 독학완료", "황기태", LocalDateTime.of(2024, 2, 28, 13, 46), 67, "수업계획서에 있는대로\n" + "\n" + "객체지향 프로그래밍2 (자바)를 알고 있어야 9주차부터 이 과목을 수강할 수 있습니다.\n" + "\n" + "8주차까지 자바 독학 완료바랍니다.\n" + "\n" + "9주차부터 자바를 알고 있다는 가정하에 서버구현부분 강의 진행합니다.",NoticeStatus.EXAM);
//        noticeService.createNotice(7L,"4월10일 공휴일 휴강안내", "황기태", LocalDateTime.of(2024, 4, 3, 13, 29), 52, "4월10일은 선거일로, 학교방침에 따라 휴강됨을 알려드립니다\n" + "\n" + "보강일(중간고사)은 9주차에 진행이되며,\n" + "\n" + "인터페이스수업은 1주~9주차 종료됩니다 ",NoticeStatus.ONLINE);
//        noticeService.createNotice(7L,"수업관련문의안내", "황기태", LocalDateTime.of(2024, 4, 12, 18, 3), 61,"수업관련하여\n" + "\n" + "추후 출결/성적등의 문의시 다른 채널을 활용할 경우 누락이 될 수 있음으로 \n" + "\n" + "반드시 이클래스 내에서 ■메세지■를 이용해주시기바랍니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(7L,"중간고사", "황기태", LocalDateTime.of(2024, 4, 21, 6, 28), 258,"1. 필기시험\n" + "\n" + "     * 총15문제(객관식12문제, 주관식 3문제)\n" + "\n" + "2. 실기시험\n" + "\n" + "      * 4-5문제\n" + "\n" + "* 필시실기 전부 closed book입니다.", NoticeStatus.EXAM);
//        noticeService.createNotice(7L,"6주차(선거일)휴강 보강일 안내", "황기태", LocalDateTime.of(2024, 5, 1, 15, 30), 35,"6주차(선거일)휴강으로 인한 보강일은 16주차(6월 19일)입니다 \n" + "\n" + "16주차에 출석하면, 6주차 출결이 인정됩니다 \n", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(7L,"코딩시험 2022년 기출문제", "황기태", LocalDateTime.of(2024, 5, 2, 14, 8), 36,"2022년 중간시험과 기말시험 기출문제 첨부합니다\n" + "\n" + "시험문제와 뼈대코드를 보고 답안지를 작성합니다.\n" + "\n" + "해답코드도 첨부하였습니다.",NoticeStatus.EXAM);
//
//        noticeService.createNotice(8L,"자바 모르는 수강생은 8주차까지 독학완료", "박승현", LocalDateTime.of(2024, 2, 28, 13, 46), 67, "수업계획서에 있는대로\n" + "\n" + "객체지향 프로그래밍2 (자바)를 알고 있어야 9주차부터 이 과목을 수강할 수 있습니다.\n" + "\n" + "8주차까지 자바 독학 완료바랍니다.\n" + "\n" + "9주차부터 자바를 알고 있다는 가정하에 서버구현부분 강의 진행합니다.",NoticeStatus.EXAM);
//        noticeService.createNotice(8L,"4월10일 공휴일 휴강안내", "박승현", LocalDateTime.of(2024, 4, 3, 13, 29), 52, "4월10일은 선거일로, 학교방침에 따라 휴강됨을 알려드립니다\n" + "\n" + "보강일(중간고사)은 9주차에 진행이되며,\n" + "\n" + "인터페이스수업은 1주~9주차 종료됩니다 ",NoticeStatus.ONLINE);
//        noticeService.createNotice(8L,"수업관련문의안내", "박승현", LocalDateTime.of(2024, 4, 12, 18, 3), 61,"수업관련하여\n" + "\n" + "추후 출결/성적등의 문의시 다른 채널을 활용할 경우 누락이 될 수 있음으로 \n" + "\n" + "반드시 이클래스 내에서 ■메세지■를 이용해주시기바랍니다", NoticeStatus.ONLINE);
//        noticeService.createNotice(8L,"중간고사", "박승현", LocalDateTime.of(2024, 4, 21, 6, 28), 258,"1. 필기시험\n" + "\n" + "     * 총15문제(객관식12문제, 주관식 3문제)\n" + "\n" + "2. 실기시험\n" + "\n" + "      * 4-5문제\n" + "\n" + "* 필시실기 전부 closed book입니다.", NoticeStatus.EXAM);
//        noticeService.createNotice(8L,"6주차(선거일)휴강 보강일 안내", "박승현", LocalDateTime.of(2024, 5, 1, 15, 30), 35,"6주차(선거일)휴강으로 인한 보강일은 16주차(6월 19일)입니다 \n" + "\n" + "16주차에 출석하면, 6주차 출결이 인정됩니다 \n", NoticeStatus.FACE_TO_FACE_CLASSES);
//        noticeService.createNotice(8L,"코딩시험 2022년 기출문제", "박승현", LocalDateTime.of(2024, 5, 2, 14, 8), 36,"2022년 중간시험과 기말시험 기출문제 첨부합니다\n" + "\n" + "시험문제와 뼈대코드를 보고 답안지를 작성합니다.\n" + "\n" + "해답코드도 첨부하였습니다.",NoticeStatus.EXAM);


//
//        qnAService.createQnA(1L,"이건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(1L,"저건 뭔가요.", "최재완", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(1L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(1L,"그건 뭔가요.", "김지훈", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE, false);
//        qnAService.createQnA(1L,"이게 뭘까요.", "이영재", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//
//        qnAService.createQnA(1L,"모르겠어요.", "이기혁", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(1L,"알려주세요.", "이하은", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED,true);
//        qnAService.createQnA(1L,"교수님.", "박세진", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED ,true);
//        qnAService.createQnA(1L,"질문 있습니다.", "김태현", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(1L,"이건 왜이럴까요.", "김예은", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(1L,"수업관련 질문입니다.", "차은우", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(1L,"오류있습니다.", "박서현", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(1L,"과제 질문입니다.", "진승원", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(1L,"과제 질문 있습니다.", "장주찬", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(1L,"저건 왜이럴까요.", "이영재", LocalDateTime.of(2024, 5, 10, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//
//        qnAService.createQnA(2L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(2L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(2L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(2L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(2L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 4, 12, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);

//        qnAService.createQnA(3L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(3L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(3L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(3L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(3L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(4L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(4L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(4L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(4L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(4L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(5L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(5L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(5L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(5L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(5L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(6L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(6L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(6L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(6L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(6L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(7L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(7L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(7L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(7L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(7L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//
//        qnAService.createQnA(8L,"이건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 12, 23, 59), 57, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, false);
//        qnAService.createQnA(8L,"저건 뭔가요.", "장주찬", LocalDateTime.of(2024, 4, 6, 23, 59), 35, "이게 뭐야",QnAStatus.COMPLETE,false);
//        qnAService.createQnA(8L,"요건 뭔가요.", "진승원", LocalDateTime.of(2024, 4, 18, 23, 59), 100, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);
//        qnAService.createQnA(8L,"그건 뭔가요.", "최재완", LocalDateTime.of(2024, 5, 12, 23, 59), 56, "이게 뭐야",QnAStatus.COMPLETE, true);
//        qnAService.createQnA(8L,"이게 뭘까요.", "장주찬", LocalDateTime.of(2024, 5, 12, 23, 59), 45, "이게 뭐야",QnAStatus.RESPONSE_EXPECTED, true);

//        Material material1 = new Material();
//        material1.setTitle("test1");
//        material1.setFileName("0. 스프링 MVC2 전체 목차.pdf");
//        material1.setFilePath("/Users/j_jchani/J_C/jbugs/JBUGS-capstone/server/src/main/resources/static/file/0. 스프링 MVC2 전체 목차.pdf");
//        material1.setWeek(week1.orElseThrow());
//        material1.setLecture(lecture1);
//        materialRepository.save(material1);
//
//        VideoMaterial videoMaterial = new VideoMaterial();
//        videoMaterial.setTitle("test1");
//        videoMaterial.setVideoName("0. 스프링 MVC2 전체 목차.pdf");
//        videoMaterial.setVideoPath("/Users/j_jchani/J_C/jbugs/JBUGS-capstone/server/src/main/resources/static/file/video/예제 도메인 모델 - 2편만 듣는 분을 위한 내용.pdf");
//        videoMaterial.setWeek(week1.orElseThrow());
//        material1.setLecture(lecture1);
//        videoMaterialRepository.save(videoMaterial);

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
    }
}
