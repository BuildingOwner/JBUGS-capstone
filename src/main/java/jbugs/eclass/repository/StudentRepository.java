package jbugs.eclass.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jbugs.eclass.domain.Student;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepository {

    @PersistenceContext
    private EntityManager em;

    public Long save(Student student) {
        em.persist(student);
        return student.getId();
    }
    public Student find(Long id) {
        return em.find(Student.class, id);
    }


}
