package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Assignment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AssignmentRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Assignment assignment){
        em.persist(assignment);
    }

    public Assignment findOne(Long id){
        return em.find(Assignment.class, id);
    }

    public List<Assignment> findAll(){
        return em.createQuery("select a from Assignment a", Assignment.class)
                .getResultList();
    }
}
