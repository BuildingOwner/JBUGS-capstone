package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Professor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@RequiredArgsConstructor
public class ProfessorRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Professor professor){
        em.persist(professor);
    }

    public Professor findOne(Long id){
        return em.find(Professor.class, id);
    }

    public List<Professor> findAll(){
        return em.createQuery("select p from Professor p", Professor.class)
                .getResultList();
    }
}
