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
public class Post extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    private String content;
    private int views;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Category category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Comment> comments = new HashSet<>();

    public void add(Comment comment) {
        comment.setPost(this);
        getComments().add(comment);
    }

    @Builder
    public Post(Category category, String title, String content) {
        this.category = category;
        this.title = title;
        this.content = content;
    }
}