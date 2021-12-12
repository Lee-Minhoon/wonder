package wonder.backend.domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    private String role = "ROLE_USER";
    @CreationTimestamp
    private Timestamp loginDate;
    @CreationTimestamp
    private Timestamp createDate;
}
