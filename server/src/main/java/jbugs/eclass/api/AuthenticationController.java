//package jbugs.eclass.api;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequiredArgsConstructor
//public class AuthenticationController {
//
//    private final AuthenticationManager authenticationManager;
//
//    //@PostMapping("/api/login")
//    public String login(@RequestBody LoginRequest loginRequest) {
//        // 사용자 이름과 비밀번호를 사용하여 UsernamePasswordAuthenticationToken 객체 생성
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                loginRequest.getLoginId(), loginRequest.getPassword());
//
//        // AuthenticationManager를 사용하여 사용자 인증 수행
//        Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//        // 인증 성공 후, SecurityContext에 Authentication 객체 저장하여 세션에 인증 상태 유지
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        return "로그인 성공";
//    }
//}
