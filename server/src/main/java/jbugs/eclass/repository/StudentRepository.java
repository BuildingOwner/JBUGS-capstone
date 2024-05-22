package jbugs.eclass.repository;


import jbugs.eclass.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

//    public Long save(Student student) {
//        em.persist(student);
//        return student.getId();
//    }
//    public Student findOne(Long id) {
//        return em.find(Student.class, id);
//    }
//
//    public List<Student> findAll(){
//        return em.createQuery("select s from Student s", Student.class)
//                .getResultList();
//    }

}
