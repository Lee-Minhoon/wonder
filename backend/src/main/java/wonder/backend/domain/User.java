package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wonder.backend.domain.common.BaseTimeEntity;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "user")
    private Set<Post> posts = new HashSet<>();  // proxy <<

    public void add(Post post) {
        post.setUser(this);
        getPosts().add(post);
    }

    @Builder
    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
