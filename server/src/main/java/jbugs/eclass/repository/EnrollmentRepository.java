package jbugs.eclass.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Enrollment;
import jbugs.eclass.domain.Lecture;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class EnrollmentRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(Enrollment enrollment){
        em.persist(enrollment);
    }

    public Enrollment findOne(Long id){
        return em.find(Enrollment.class, id);
    }

    public List<Enrollment> findAll(){
        return em.createQuery("select e from Enrollment e", Enrollment.class)
                .getResultList();
    }
    public List<Enrollment> findAllByStudentId(Long studentId) {
        return em.createQuery("select e from Enrollment e where e.student.id = :studentId", Enrollment.class)
                .setParameter("studentId", studentId)
                .getResultList();
    }

    public Lecture findLectureByEnrollmentId(Long enrollmentId) {
        return em.createQuery("select e.lecture from Enrollment e where e.id = :enrollmentId", Lecture.class)
                .setParameter("enrollmentId", enrollmentId)
                .getSingleResult();
    }
}
