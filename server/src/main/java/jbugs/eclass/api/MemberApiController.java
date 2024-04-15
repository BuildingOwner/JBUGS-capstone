package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.Member;
import jbugs.eclass.dto.LoginRequest;
import jbugs.eclass.dto.LoginResponse;
import jbugs.eclass.login.LoginForm;
import jbugs.eclass.service.MemberService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
public class MemberApiController {

    private final MemberService memberService;
//    private final AuthenticationManager authenticationManager;

    //@GetMapping("/api/login")
    public ModelAndView loginForm(@ModelAttribute("loginForm") LoginRequest form) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login/loginForm");
        return modelAndView;
    }

    //HttpSession을 사용
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginForm form, HttpServletRequest request) {
        // 아이디와 비밀번호로 로그인 정보를 검증하는 메서드를 호출
//        boolean isAuthenticated = memberService.authenticate(form.getLoginId(), form.getPassword());

        Member loginMember = memberService.login(form.getLoginId(), form.getPassword());
        log.info("login? {}", loginMember);

        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 맞지 않습니다.");
        }

        // 로그인 성공 시 세션에 로그인 정보 저장
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

//            Member loginMember = memberService.getMemberByLoginId(form.getLoginId());

        LoginResponse response = new LoginResponse();
        response.setSessionId(session.getId());
        response.setMessage("로그인 성공");

        LoginResponse.User user = new LoginResponse.User();
        user.setLoginId(loginMember.getLoginId());
        user.setName(loginMember.getName());
        user.setMemberType(loginMember.getMemberType());
        response.setUser(user);

        return ResponseEntity.ok(response);
    }

    //Spring Security 사용
    //@PostMapping("/api/login")
//    public ResponseEntity<?> loginV2(@RequestBody LoginForm form, HttpServletRequest request) {
//        try {
//            // 사용자 이름과 비밀번호를 사용하여 UsernamePasswordAuthenticationToken 객체 생성
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                    form.getLoginId(), form.getPassword());
//
//            // AuthenticationManager를 사용하여 사용자 인증 수행
//            Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//            // 인증 성공 후, SecurityContext에 Authentication 객체 저장하여 세션에 인증 상태 유지
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            // 세션 ID를 포함한 쿠키 설정
//            HttpSession session = request.getSession();
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Set-Cookie", "JSESSIONID=" + session.getId() + "; Path=/; HttpOnly");
//
//            return ResponseEntity.ok().headers(headers).body("로그인 성공");
//        } catch (BadCredentialsException e) {
//            // 로그인 실패 시 에러 메시지 반환
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 맞지 않습니다.");
//        }
//    }
    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }
}

