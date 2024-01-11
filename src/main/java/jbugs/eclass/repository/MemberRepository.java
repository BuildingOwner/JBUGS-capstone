package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Member;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Member member){
        em.persist(member);
    }

    //단건 조회
    public Member findOne(Long id){
        return em.find(Member.class, id);
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
