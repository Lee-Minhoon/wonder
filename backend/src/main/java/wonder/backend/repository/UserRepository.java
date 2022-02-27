package wonder.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wonder.backend.domain.User;
import wonder.backend.dto.mapper.UserMapper;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);

    @Query(value = "SELECT u.id, u.exp, u.email, u.nickname, u.profile_image_url as profileImageUrl, u.intro, " +
            "u.created_at as createdAt, u.logged_in_at as loggedInAt, " +
            "(SELECT COUNT(user.id) FROM user WHERE user.exp >= u.exp) as rank, " +
            "COUNT(DISTINCT follow.followee_id) as followStatus, " +
            "COUNT(DISTINCT followers.followee_id) as countFollowers, count(DISTINCT followees.follower_id) as countFollowees, " +
            "COUNT(DISTINCT p.id) as countPosts, count(DISTINCT c.id) as countComments " +
            "FROM user as u " +
            "LEFT JOIN follow " +
            "ON follow.follower_id = :loginUserId AND follow.followee_id = u.id " +
            "LEFT JOIN follow as followees " +
            "ON followees.follower_id = u.id " +
            "LEFT JOIN follow as followers " +
            "ON followers.followee_id = u.id " +
            "LEFT JOIN post as p " +
            "ON p.user_id = u.id " +
            "LEFT JOIN comment as c " +
            "ON c.user_id = u.id " +
            "WHERE u.id = :id " +
            "GROUP by u.id",
            countQuery = "SELECT * FROM user as u " +
                    "WHERE u.id = :id",
            nativeQuery = true)
    Optional<UserMapper.ReadUserMapper> findUserInfoById(Long loginUserId, Long id);

    @Query(value = "SELECT u.id, u.exp, u.email, u.nickname, u.profile_image_url as profileImageUrl, " +
            "CASE WHEN f.follower_id = :loginUserId THEN 1 ELSE 0 END as followStatus, f.followed_at " +
            "FROM user as u " +
            "LEFT JOIN follow as f " +
            "ON f.followee_id = :followeeId " +
            "WHERE u.id = f.follower_id ",
            countQuery = "SELECT * FROM follow as f  " +
                    "WHERE u.id = f.follower_id",
            nativeQuery = true)
    Page<UserMapper.ReadUsersMapper> findAllFollowersById(Long loginUserId, Long followeeId, Pageable pageable);

    @Query(value = "SELECT u.id, u.exp, u.email, u.nickname, u.profile_image_url as profileImageUrl, " +
            "CASE WHEN f.follower_id = :loginUserId THEN 1 ELSE 0 END as followStatus, f.followed_at " +
            "FROM user as u " +
            "LEFT JOIN follow as f " +
            "ON f.follower_id = :followerId " +
            "WHERE u.id = f.followee_id ",
            countQuery = "SELECT * FROM follow as f  " +
                    "WHERE u.id = f.followee_id",
            nativeQuery = true)
    Page<UserMapper.ReadUsersMapper> findAllFolloweesById(Long loginUserId, Long followerId, Pageable pageable);
}
