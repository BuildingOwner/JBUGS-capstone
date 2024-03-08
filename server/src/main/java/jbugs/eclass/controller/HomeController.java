package jbugs.eclass.controller;

import jbugs.eclass.argumentresolver.Login;
import jbugs.eclass.domain.Enrollment;
import jbugs.eclass.domain.Lecture;
import jbugs.eclass.domain.Member;
import jbugs.eclass.domain.Student;
import jbugs.eclass.repository.LectureRepository;
import jbugs.eclass.repository.MemberRepository;
import jbugs.eclass.repository.ProfessorRepository;
import jbugs.eclass.repository.StudentRepository;
import jbugs.eclass.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    //@GetMapping("/")
    public String home() {
        return "home";
    }

    private final MemberRepository memberRepository;
    private final EnrollmentService enrollmentService;
    private final StudentRepository studentRepository;
    private final LectureRepository lectureRepository;
    private final ProfessorRepository professorRepository;

    @GetMapping("/")
    public String homeLoginV3ArgumentResolver(@Login Member loginMember, Model model) {
        //세션에 회원 데이터가 없으면 home
        if (loginMember == null) {
        return "home";
        }

        //세션이 유지되면 로그인으로 이동
        model.addAttribute("member", loginMember);
        Student student = studentRepository.findOne(loginMember.getStudent().getId());

        model.addAttribute("track", student.getFirstTrack());

        List<Enrollment> enrollments = enrollmentService.findAllByStudentId(student.getId());
        for (Enrollment enrollment : enrollments) {
            Long lectureId = enrollment.getLecture().getId();
            Long professorId = enrollment.getLecture().getProfessor().getId();

            Lecture lecture = lectureRepository.findOne(lectureId);
            Member professor = memberRepository.findById(professorId);

            String lectureName = lecture.getName();
            String lectureDivision = lecture.getDivision();
            String professorName = professor.getName();
        }
        model.addAttribute("enrollment",enrollments);
        return "loginHome";
    }

}

