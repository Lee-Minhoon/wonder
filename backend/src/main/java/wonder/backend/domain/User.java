package wonder.backend.domain;

import lombok.*;
import wonder.backend.domain.common.BaseTimeEntity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity @Getter @Setter @NoArgsConstructor
public class User extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long exp = 0L;

    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    private String profileImageUrl;
    private String role = "ROLE_USER";
    private String intro;
    private Timestamp loggedInAt;

    @OneToMany(mappedBy = "user")
    private Set<Post> posts = new HashSet<>();

    public void addPost(Post post) {
        post.setUser(this);
        getPosts().add(post);
    }

    @OneToMany(mappedBy = "sender")
    private Set<Message> sentMessages = new HashSet<>();

    public void addSentMessage(Message message) {
        message.setSender(this);
        getSentMessages().add(message);
    }

    @OneToMany(mappedBy = "recipient")
    private Set<Message> receivedMessages = new HashSet<>();

    public void addReceivedMessage(Message message) {
        message.setRecipient(this);
        getReceivedMessages().add(message);
    }

    @OneToMany(mappedBy = "followee", fetch = FetchType.LAZY)
    private Set<Follow> followers = new HashSet<>();

    public void addFollower(Follow follow) {
        follow.setFollowee(this);
        getFollowers().add(follow);
    }

    @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY)
    private Set<Follow> followees = new HashSet<>();

    public void addFollowee(Follow follow) {
        follow.setFollower(this);
        getFollowees().add(follow);
    }

    @Builder
    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
