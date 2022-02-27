package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public class UserMapper {
    public interface ReadUserMapper {
        Long getId();
        Long getExp();
        String getEmail();
        String getNickname();
        String getProfileImageUrl();
        String getIntro();
        Timestamp getCreatedAt();
        Timestamp getLoggedInAt();
        int getRank();
        int getFollowStatus();
        int getCountFollowers();
        int getCountFollowees();
        int getCountPosts();
        int getCountComments();
    }

    public interface ReadUsersMapper {
        Long getId();
        Long getExp();
        String getEmail();
        String getNickname();
        String getProfileImageUrl();
        Timestamp getFollowedAt();
        int getFollowStatus();
    }
}