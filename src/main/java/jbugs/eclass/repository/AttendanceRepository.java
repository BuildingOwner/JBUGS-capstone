package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Attendance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AttendanceRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Attendance attendance){
        em.persist(attendance);
    }

    public Attendance findOne(Long id){
        return em.find(Attendance.class, id);
    }

    public List<Attendance> findAll(){
        return em.createQuery("select a from Attendance a", Attendance.class)
                .getResultList();
    }
}
