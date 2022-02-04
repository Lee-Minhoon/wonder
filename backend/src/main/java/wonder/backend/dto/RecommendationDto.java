package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.Recommendation;

public class RecommendationDto {

    @Getter
    public static class CreateRecommendationDto {
        private Long postId;
    }
}
