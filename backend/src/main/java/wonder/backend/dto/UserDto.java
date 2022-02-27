package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import wonder.backend.dto.mapper.UserMapper;

import java.sql.Timestamp;

public class UserDto {
    @Getter
    public static class ReadUserDto {
        private Long id;
        private Long exp;
        private String email;
        private String nickname;
        private String profileImageUrl;
        private String intro;
        private Timestamp createdAt;
        private Timestamp loggedInAt;
        private int rank;
        private int followStatus;
        private int countFollowers;
        private int countFollowees;
        private int countPosts;
        private int countComments;

        @Builder
        public ReadUserDto(UserMapper.ReadUserMapper userMapper) {
            this.id = userMapper.getId();
            this.exp = userMapper.getExp();
            this.email = userMapper.getEmail();
            this.nickname = userMapper.getNickname();
            this.profileImageUrl = userMapper.getProfileImageUrl();
            this.intro = userMapper.getIntro();
            this.createdAt = userMapper.getCreatedAt();
            this.loggedInAt = userMapper.getLoggedInAt();
            this.followStatus = userMapper.getFollowStatus();
            this.rank = userMapper.getRank();
            this.countFollowers = userMapper.getCountFollowers();
            this.countFollowees = userMapper.getCountFollowees();
            this.countPosts = userMapper.getCountPosts();
            this.countComments = userMapper.getCountComments();
        }
    }

    @Getter
    public static class ReadUsersDto {
        private Long id;
        private Long exp;
        private String email;
        private String nickname;
        private String profileImageUrl;
        private Timestamp followedAt;
        private int followStatus;

        @Builder
        public ReadUsersDto(UserMapper.ReadUsersMapper usersMapper) {
            this.id = usersMapper.getId();
            this.exp = usersMapper.getExp();
            this.email = usersMapper.getEmail();
            this.nickname = usersMapper.getNickname();
            this.profileImageUrl = usersMapper.getProfileImageUrl();
            this.followedAt = usersMapper.getFollowedAt();
            this.followStatus = usersMapper.getFollowStatus();
        }
    }

    @Getter
    public static class UpdateMeDto {
        private MultipartFile profileImage;
        private String password;
        private String nickname;
    }
}
