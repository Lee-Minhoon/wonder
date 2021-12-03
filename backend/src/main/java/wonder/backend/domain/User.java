package wonder.backend.domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long number;
    @Column(unique = true)
    private String id;
    private String password;
    private String nickname;
    private String role;
    @CreationTimestamp
    private Timestamp date;
}
