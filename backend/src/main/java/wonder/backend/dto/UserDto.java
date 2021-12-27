package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.User;

@Getter
public class UserDto {
    private Long id;
    private String email;
    private String nickname;
    private String grade;
    private String role;

    @Builder
    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.grade = user.getGrade();
        this.role = user.getRole();
    }
}
