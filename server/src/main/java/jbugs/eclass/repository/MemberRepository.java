package jbugs.eclass.repository;

import jbugs.eclass.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 로그인 ID로 Member 조회
    Optional<Member> findByLoginId(String loginId);
}