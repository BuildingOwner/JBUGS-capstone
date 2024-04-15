package jbugs.eclass.dto;

import jbugs.eclass.domain.MemberType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String sessionId;
    private String message;
    private User user;

    public static class User {
        private String loginId;
        private String name;
        private MemberType memberType;

        // Getter와 Setter
        public String getLoginId() {
            return loginId;
        }

        public void setLoginId(String loginId) {
            this.loginId = loginId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setMemberType(MemberType memberType){
            this.memberType = memberType;
        }

        public MemberType getMemberType() {
            return memberType;
        }
    }

}
