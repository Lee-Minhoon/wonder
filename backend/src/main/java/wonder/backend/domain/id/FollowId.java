package wonder.backend.domain.id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter @Setter @NoArgsConstructor
public class FollowId implements Serializable {
    private Long followerId;
    private Long followeeId;

    @Builder
    public FollowId(Long followerId, Long followeeId) {
        this.followerId = followerId;
        this.followeeId = followeeId;
    }
}