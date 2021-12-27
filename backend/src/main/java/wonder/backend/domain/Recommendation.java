package wonder.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import wonder.backend.domain.id.RecommendationId;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity @Getter @Setter @NoArgsConstructor
public class Recommendation {
    @EmbeddedId
    private RecommendationId recommendationId;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @MapsId("postId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @CreationTimestamp
    private Timestamp createDate;

    @Builder
    public Recommendation(RecommendationId recommendationId, User user, Post post) {
        this.recommendationId = recommendationId;
        this.user = user;
        this.post = post;
    }
}
