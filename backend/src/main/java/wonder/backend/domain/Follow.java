package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import wonder.backend.domain.id.FollowId;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Getter @Setter @NoArgsConstructor
public class Follow {
    @EmbeddedId
    private FollowId followId;

    @MapsId("followerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User follower;

    @MapsId("followeeId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User followee;

    @CreationTimestamp
    private Timestamp followedAt;

    @Builder
    public Follow(FollowId followId, User follower, User followee) {
        this.followId = followId;
        this.follower = follower;
        this.followee = followee;
    }
}
