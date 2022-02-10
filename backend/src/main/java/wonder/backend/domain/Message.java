package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Getter @Setter @NoArgsConstructor
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;

    @CreationTimestamp
    private Timestamp sentAt;

    private Timestamp receivedAt;

//    @MapsId("sent_messages")
    @JoinColumn(name = "sent_messages")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User sender;

//    @MapsId("received_messages")
    @JoinColumn(name = "received_messages")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User recipient;

    public Message(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public Message(String title, String content, User sender, User recipient) {
        this.title = title;
        this.content = content;
        this.sender = sender;
        this.recipient = recipient;
    }
}