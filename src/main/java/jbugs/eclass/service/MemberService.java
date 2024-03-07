package jbugs.eclass.service;

import jbugs.eclass.domain.Member;
import jbugs.eclass.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Member saveMember(Member member) {
//        validateMember(member); // 예를 들어 회원 정보 검증 로직
        return memberRepository.save(member);
    }


}
