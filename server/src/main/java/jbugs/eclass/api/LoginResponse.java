package jbugs.eclass.api;

import lombok.Getter;

@Getter
public class LoginResponse {
    private Long id;
    private String name;

    private String message;
    public LoginResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
