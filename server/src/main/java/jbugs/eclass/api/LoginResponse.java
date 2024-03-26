package jbugs.eclass.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String redirectURL; // 추가된 속성
    private String sessionId;

    public LoginResponse(String redirectURL) {
        this.redirectURL = redirectURL;
    }
}
