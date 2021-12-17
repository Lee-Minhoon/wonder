package wonder.backend.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity @Getter @Setter
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    private String grade = "NORMAL";
    private String role = "ROLE_USER";
    @CreationTimestamp
    private Timestamp loginDate;
    @CreationTimestamp
    private Timestamp createDate;

    @OneToMany(mappedBy = "user")
//    private Set<Post> posts = new HashSet<>();
    private List<Post> posts = new ArrayList<>();

    public void add(Post post) {
        post.setUser(this);
        getPosts().add(post);
    }

//    @Builder
//    public User(String email, String password, String nickname) {
//        this.email = email;
//        this.password = password;
//        this.nickname = nickname;
//    }
}
