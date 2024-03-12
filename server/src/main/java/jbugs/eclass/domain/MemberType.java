package jbugs.eclass.domain;

public enum MemberType {
    ADMIN, STUDENT, PROFESSOR;

    public String getAuthorities() {
        switch (this) {
            case ADMIN:
                return "ADMIN";
            case STUDENT:
                return "STUDENT";
            case PROFESSOR:
                return "PROFESSOR";
            default:
                throw new IllegalArgumentException("Unsupported member type: " + this);
        }
    }
}
