package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Week;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class WeekRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Week week){
        em.persist(week);
    }

    public Week findOne(Long id){
        return em.find(Week.class, id);
    }

    public List<Week> findAll(){
        return em.createQuery("select w from Week w", Week.class)
                .getResultList();
    }

    public Optional<Week> findByLectureIdAndWeekNumber(Long lectureId, int weekNumber) {
        return em.createQuery("select w from Week w where w.lecture.id = :lectureId and w.weekNumber = :weekNumber", Week.class)
                .setParameter("lectureId", lectureId)
                .setParameter("weekNumber", weekNumber)
                .getResultList()
                .stream()
                .findFirst();
    }

    public List<Week> findByLectureId(Long lectureId) {
        return em.createQuery("select w from Week w where w.lecture.id = :lectureId", Week.class)
                .setParameter("lectureId", lectureId)
                .getResultList();
    }
}
