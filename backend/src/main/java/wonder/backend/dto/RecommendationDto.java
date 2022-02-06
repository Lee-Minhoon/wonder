package wonder.backend.dto;

import lombok.Getter;

public class RecommendationDto {

    @Getter
    public static class CreateRecommendationDto {
        private Long postId;
    }
}
