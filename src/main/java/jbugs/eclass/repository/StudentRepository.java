package jbugs.eclass.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jbugs.eclass.domain.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StudentRepository {

    @PersistenceContext
    private EntityManager em;

    public Long save(Student student) {
        em.persist(student);
        return student.getId();
    }
    public Student findOne(Long id) {
        return em.find(Student.class, id);
    }

    public List<Student> findAll(){
        return em.createQuery("select s from Student s", Student.class)
                .getResultList();
    }

}
