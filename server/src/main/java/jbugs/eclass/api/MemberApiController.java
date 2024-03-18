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

    @GetMapping("/api/login")
    public ModelAndView loginForm(@ModelAttribute("loginForm") LoginRequest form) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login/loginForm");
        return modelAndView;
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginForm form, BindingResult bindingResult,
//                                               @RequestParam(defaultValue = "/") String redirectURL,
//                                               HttpServletRequest request) {
//        if (bindingResult.hasErrors()) {
//            return ResponseEntity.badRequest().body(new LoginResponse("입력한 값이 올바르지 않습니다."));
//        }
//
//        Member loginMember = memberService.login(form.getLoginId(), form.getPassword());
//        System.out.println(loginMember+"성공");
//        if (loginMember == null) {
//            return ResponseEntity.badRequest().body(new LoginResponse("아이디 또는 비밀번호가 맞지 않습니다."));
//        }
//
//        HttpSession session = request.getSession();
//        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
//
////        LoginResponse response = new LoginResponse("로그인 성공");
////        return ResponseEntity.ok(response);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create(redirectURL));
//
//        return ResponseEntity.ok().headers(headers).build();
//    }

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
}

