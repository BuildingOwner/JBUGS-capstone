package jbugs.eclass.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Long id;
    private String name;
    private String redirectURL; // 추가된 속성

    public LoginResponse(String redirectURL) {
        this.redirectURL = redirectURL;
    }
}
