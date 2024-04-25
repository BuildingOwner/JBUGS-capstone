package jbugs.eclass.repository;

import jbugs.eclass.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // 이름으로 Member 조회
    Optional<Member> findByName(String name);

    // 로그인 ID로 Member 조회
    Optional<Member> findByLoginId(String loginId);

    // 기타 필요한 메서드가 있으면 여기에 추가
}
