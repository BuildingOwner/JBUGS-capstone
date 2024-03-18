package jbugs.eclass.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeController {

    private final MemberRepository memberRepository;
    private final EnrollmentService enrollmentService;
    private final StudentRepository studentRepository;
    private final LectureRepository lectureRepository;
    private final ProfessorRepository professorRepository;

    //@GetMapping("/")
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

    @GetMapping("/")
    public RedirectView main(HttpServletRequest request) {
        // 세션에서 로그인 정보 확인
        HttpSession session = request.getSession();
        String loggedInUser = (String) session.getAttribute("loggedInUser");

        if (loggedInUser != null) {
            // 로그인된 사용자인 경우 main 페이지로 리다이렉트
            return new RedirectView("/main.html");
        } else {
            // 로그인되지 않은 사용자인 경우 로그인 페이지로 리다이렉트
            return new RedirectView("/login.html");
        }
    }
}


