package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.User;

public class UserDto {
    @Getter
    public static class ReadUserDto {
        private Long id;
        private String email;
        private String nickname;
        private String grade;
        private String role;

        @Builder
        public ReadUserDto(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.nickname = user.getNickname();
            this.grade = user.getGrade();
            this.role = user.getRole();
        }
    }
}
