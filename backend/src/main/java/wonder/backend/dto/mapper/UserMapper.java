package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public class UserMapper {
    public interface ReadUserMapper {
        Long getId();
        String getEmail();
        String getNickname();
        String getGrade();
        Timestamp getCreatedAt();
        Timestamp getLoggedInAt();
        int getFollowStatus();
        int getCountFollowers();
        int getCountFollowees();
        int getCountPosts();
        int getCountComments();
    }

    public interface ReadAllUsersMapper {
        Long getId();
        String getEmail();
        String getNickname();
        String getGrade();
        Timestamp getFollowedAt();
        int getFollowStatus();
    }
}