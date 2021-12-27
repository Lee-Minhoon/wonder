package wonder.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import wonder.backend.domain.Recommendation;

@Data
public class RecommendationDto {
    private Long userId;
    private Long postId;

    @Builder
    public RecommendationDto(Recommendation recommendation) {
        this.userId = recommendation.getRecommendationId().getUserId();
        this.postId = recommendation.getRecommendationId().getUserId();
    }
}
