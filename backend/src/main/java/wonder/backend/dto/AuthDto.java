package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;

public class AuthDto {
    @Getter
    public static class LoginRequestDto {
        private String email;
        private String password;
    }

    @Getter
    public static class LoginResponseDto {
        private Long id;
        private String nickname;
        private String token;

        @Builder
        public LoginResponseDto(Long id, String nickname, String token) {
            this.id = id;
            this.nickname = nickname;
            this.token = token;
        }
    }

    @Getter
    public static class SignupDto {
        private String email;
        private String password;
        private String nickname;
    }
}
