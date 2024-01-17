package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public Member save(Member member){
        if (member.getId() == null) {
            em.persist(member); // 새로운 엔티티를 저장(등록)
        } else {
            em.merge(member); // 기존 엔티티를 업데이트
        }
        return member;
    }

    //단건 조회
    public Member findById(Long id) {
        return em.find(Member.class, id);
    }

    public Optional<Member> findByLoginId(String loginId) {
        List<Member> result = em.createQuery("select m from Member m where m.loginId = :loginId", Member.class)
                .setParameter("loginId", loginId)
                .getResultList();
        return result.stream().findFirst();
    }

    // 전체 조회
    public List<Member> findAll(){
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }

    // 특정이름 회원조회
    public List<Member> findByName(String name){
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
    }

}
