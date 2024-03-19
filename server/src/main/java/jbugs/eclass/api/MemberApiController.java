package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jbugs.eclass.domain.Member;
import jbugs.eclass.login.LoginForm;
import jbugs.eclass.service.MemberService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class MemberApiController {

    private final MemberService memberService;

    //@GetMapping("/api/login")
    public ModelAndView loginForm(@ModelAttribute("loginForm") LoginRequest form) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login/loginForm");
        return modelAndView;
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginForm form, HttpServletRequest request) {
        // 아이디와 비밀번호로 로그인 정보를 검증하는 메서드를 호출
        boolean isAuthenticated = memberService.authenticate(form.getLoginId(), form.getPassword());

        if (isAuthenticated) {
            // 로그인 성공 시 세션에 로그인 정보 저장
            HttpSession session = request.getSession();
            session.setAttribute("loggedInUser", form.getLoginId());

            Member loginMember = memberService.getMemberByLoginId(form.getLoginId());

            LoginResponse response = new LoginResponse("/main");
            response.setId(loginMember.getId());
            response.setName(loginMember.getName());
            return ResponseEntity.ok(response);
        } else {
            // 로그인 실패 시 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 맞지 않습니다.");
        }
    }

    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/check-auth")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loggedInUser") != null) {
            // 로그인된 상태
            return ResponseEntity.ok().build();
        } else {
            // 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/api/protected")
    public ResponseEntity<?> protectedEndpoint(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증이 필요합니다.");
        }

        // 인증된 사용자일 경우에 대한 로직 수행
        // ...

        return ResponseEntity.ok("인증된 사용자만 접근 가능한 경로입니다.");
    }

}

