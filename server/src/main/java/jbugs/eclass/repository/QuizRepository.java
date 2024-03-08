package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Quiz;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuizRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Quiz quiz){
        em.persist(quiz);
    }

    public Quiz findOne(Long id){
        return em.find(Quiz.class, id);
    }

    public List<Quiz> findAll(){
        return em.createQuery("select q from Quiz q", Quiz.class)
                .getResultList();
    }
}
