package wonder.backend.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity @Getter @Setter @NoArgsConstructor
public class Post {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private int views;
    private int likes;
    @CreationTimestamp
    private Timestamp updateDate;
    @CreationTimestamp
    private Timestamp createDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User user;

    @OneToMany(mappedBy = "post")
    private Set<Recommendation> likesses = new HashSet<>();

    public void add(Recommendation recommendation) {
        recommendation.setPost(this);
        getLikesses().add(recommendation);
    }

    @OneToMany(mappedBy = "post")
    private Set<Comment> comments = new HashSet<>();

    public void add(Comment comment) {
        comment.setPost(this);
        getComments().add(comment);
    }

    @Builder
    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }
}