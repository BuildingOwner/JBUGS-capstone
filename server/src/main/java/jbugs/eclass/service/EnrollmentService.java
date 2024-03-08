package jbugs.eclass.service;

import jbugs.eclass.domain.Enrollment;
import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Student;
import jbugs.eclass.repository.EnrollmentRepository;
import jbugs.eclass.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final WeekRepository weekRepository;

    @Transactional
    public void enrollStudentInLecture(Student student, Lecture lecture) {
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setLecture(lecture);

        enrollmentRepository.save(enrollment);
    }

    @Transactional
    public void saveEnrollment(Enrollment enrollment) {
        enrollmentRepository.save(enrollment);
    }

    public Enrollment findOne(Long id) {
        return enrollmentRepository.findOne(id);
    }

    public List<Enrollment> findAll() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> findAllByStudentId(Long studentId) {
        return enrollmentRepository.findAllByStudentId(studentId);
    }
}
