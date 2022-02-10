package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.User;
import wonder.backend.dto.mapper.UserMapper;

import java.sql.Timestamp;

public class UserDto {
    @Getter
    public static class ReadUserDto {
        private Long id;
        private String email;
        private String nickname;
        private String grade;
        private String role;
        private Timestamp createdAt;
        private Timestamp loggedInAt;
        private int followStatus;
        private int countFollowers;
        private int countFollowees;
        private int countPosts;
        private int countComments;

        @Builder
        public ReadUserDto(UserMapper.ReadUserMapper userMapper) {
            this.id = userMapper.getId();
            this.email = userMapper.getEmail();
            this.nickname = userMapper.getNickname();
            this.grade = userMapper.getGrade();
            this.createdAt = userMapper.getCreatedAt();
            this.loggedInAt = userMapper.getLoggedInAt();
            this.followStatus = userMapper.getFollowStatus();
            this.countFollowers = userMapper.getCountFollowers();
            this.countFollowees = userMapper.getCountFollowees();
            this.countPosts = userMapper.getCountPosts();
            this.countComments = userMapper.getCountComments();
        }
    }

    @Getter
    public static class ReadAllUsersDto {
        private Long id;
        private String email;
        private String nickname;
        private String grade;
        private Timestamp followedAt;
        private int followStatus;

        @Builder
        public ReadAllUsersDto(UserMapper.ReadAllUsersMapper usersMapper) {
            this.id = usersMapper.getId();
            this.email = usersMapper.getEmail();
            this.nickname = usersMapper.getNickname();
            this.grade = usersMapper.getGrade();
            this.followedAt = usersMapper.getFollowedAt();
            this.followStatus = usersMapper.getFollowStatus();
        }
    }
}
