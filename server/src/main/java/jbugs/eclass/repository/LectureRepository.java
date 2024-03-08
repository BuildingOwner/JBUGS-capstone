package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Lecture;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LectureRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Lecture lecture){
        if(lecture.getId() == null){
            em.persist(lecture);
        }else{
            em.merge(lecture);
        }
    }

    public Lecture findOne(Long id){
        return em.find(Lecture.class, id);
    }

    public List<Lecture> findAll(){
        return em.createQuery("select l from Lecture l", Lecture.class)
                .getResultList();
    }
}
