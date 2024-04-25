package jbugs.eclass.repository;

import jbugs.eclass.domain.Student;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentRepositoryTest {
    @Autowired StudentRepository studentRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void testStudent() throws Exception {
        //given
        Student student = new Student();

        //when
        Long saveId = studentRepository.save(student);
        Student findStudent = studentRepository.find(saveId);

        //then
        Assertions.assertThat(findStudent.getId()).isEqualTo(student.getId());
    }
}