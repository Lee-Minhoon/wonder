package wonder.backend.dto;

import lombok.Getter;

public class AuthDto {
    @Getter
    public static class LoginDto {
        private String email;
        private String password;
    }

    @Getter
    public static class SignupDto {
        private String email;
        private String password;
        private String nickname;
    }
}
