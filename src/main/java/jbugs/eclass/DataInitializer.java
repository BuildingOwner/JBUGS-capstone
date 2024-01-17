package jbugs.eclass;

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
        memberRepository.save(member1);
    }
}
