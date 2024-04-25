package jbugs.eclass.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class LoginRequest {
    private String loginId;
    private String password;

}
