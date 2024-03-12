package jbugs.eclass.api;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class LoginRequest {
    private String loginId;
    private String password;

}
