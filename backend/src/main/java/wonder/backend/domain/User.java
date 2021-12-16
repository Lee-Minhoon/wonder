package wonder.backend.domain;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity @Getter @Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    private String grade;
    private String role = "ROLE_USER";
    @CreationTimestamp
    private Timestamp loginDate;
    @CreationTimestamp
    private Timestamp createDate;

    @OneToMany(mappedBy = "user")
    private Set<Post> posts = new HashSet<>();

    public void add(Post post) {
        post.setUser(this);
        getPosts().add(post);
    }
}
