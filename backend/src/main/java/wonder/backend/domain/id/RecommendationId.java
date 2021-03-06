package wonder.backend.domain.id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter @Setter @NoArgsConstructor
public class RecommendationId implements Serializable {
    private Long userId;
    private Long postId;

    @Builder
    public RecommendationId(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
    }
}