package jbugs.eclass.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jbugs.eclass.domain.Member;
import jbugs.eclass.dto.LoginForm;
import jbugs.eclass.dto.LoginResponse;
import jbugs.eclass.service.MemberService;
import jbugs.eclass.session.SessionConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginForm form, HttpServletRequest request) {
        Member loginMember = memberService.login(form.getLoginId(), form.getPassword());
        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 맞지 않습니다.");
        }

        // 로그인 성공 시 세션에 로그인 정보 저장
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

        LoginResponse response = new LoginResponse();
        response.setSessionId(session.getId());
        response.setMessage("로그인 성공");
        response.setUser(createUserResponse(loginMember));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    private LoginResponse.User createUserResponse(Member member) {
        LoginResponse.User user = new LoginResponse.User();
        user.setLoginId(member.getLoginId());
        user.setName(member.getName());
        user.setMemberType(member.getMemberType());
        return user;
    }
}
