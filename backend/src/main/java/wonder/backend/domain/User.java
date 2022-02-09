package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wonder.backend.domain.common.BaseTimeEntity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity @Getter @Setter @NoArgsConstructor
public class User extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    private String grade = "NORMAL";
    private String role = "ROLE_USER";
    private Timestamp loggedInAt;

    @OneToMany(mappedBy = "user")
    private Set<Post> posts = new HashSet<>();

    public void add(Post post) {
        post.setUser(this);
        getPosts().add(post);
    }

    @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY)
    private Set<Follow> followees = new HashSet<>();

    public void addFollowee(Follow follow) {
        follow.setFollower(this);
        getFollowees().add(follow);
    }

    @OneToMany(mappedBy = "followee", fetch = FetchType.LAZY)
    private Set<Follow> followers = new HashSet<>();

    public void addFollower(Follow follow) {
        follow.setFollowee(this);
        getFollowers().add(follow);
    }

    @Builder
    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
