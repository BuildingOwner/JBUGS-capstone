//package jbugs.eclass.service;
//
//import jbugs.eclass.domain.Member;
//import jbugs.eclass.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class CustomUserDetailsService implements UserDetailsService {
//    private final MemberRepository memberRepository; // 사용자 정보를 조회하기 위한 리포지토리
//
//    @Override
//    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
//        Member member = memberRepository.findByName(name)
//                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + name));
//
//        // Member 엔티티의 toUserDetails 메서드를 사용하여 UserDetails 객체 생성
//        return member.toUserDetails();
//    }
//}
