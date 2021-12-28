package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity @Getter @Setter @NoArgsConstructor
public class Category {
    @Id @GeneratedValue
    private Long id;
    private Long parentId;
    private String name;

//    @OneToMany(mappedBy = "post")
//    private Set<Comment> comments = new HashSet<>();
//
//    public void add(Comment comment) {
//        comment.setPost(this);
//        getComments().add(comment);
//    }
}
