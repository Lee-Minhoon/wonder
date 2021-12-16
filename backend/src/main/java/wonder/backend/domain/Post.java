package wonder.backend.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Getter @Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private int views;
    @CreationTimestamp
    private Timestamp updateDate;
    @CreationTimestamp
    private Timestamp createDate;

    @ManyToOne
    private User user;
}
