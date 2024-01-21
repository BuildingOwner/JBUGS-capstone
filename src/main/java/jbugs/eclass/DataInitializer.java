package jbugs.eclass;

import jbugs.eclass.domain.MemberType;
import jbugs.eclass.domain.Professor;
import jbugs.eclass.domain.Student;
import jbugs.eclass.repository.MemberRepository;
import jbugs.eclass.domain.Member;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;

    public DataInitializer(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 테스트 데이터 생성 및 저장
        Member member1 = new Member();
        member1.setLoginId("1971080");
        member1.setName("장주찬");
        member1.setPassword("1234!");
        member1.setMemberType(MemberType.STUDENT);

        Student student1 = new Student();
        student1.setFirstTrack("웹공학트랙");
        student1.setSecondTrack("모바일소프트웨어트랙");

        member1.setStudent(student1);
        student1.setMember(member1);

        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setLoginId("1111");
        member2.setName("김성동");
        member2.setPassword("1234!");
        member2.setMemberType(MemberType.PROFESSOR);

        Professor professor1 = new Professor();
        professor1.setMajor("컴퓨터공학과");
        professor1.setEmail("sdkim@hansung.ac.kr");
        professor1.setLab("연구관327");

        member2.setProfessor(professor1);
        professor1.setMember(member2);

        memberRepository.save(member2);
    }
}
