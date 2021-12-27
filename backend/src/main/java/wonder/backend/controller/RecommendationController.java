package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.id.RecommendationId;
import wonder.backend.dto.Response;
import wonder.backend.service.RecommendationService;

@RestController
@RequestMapping("recommendation")
@AllArgsConstructor
public class RecommendationController {
    private final Logger logger = LoggerFactory.getLogger(RecommendationController.class);

    private final RecommendationService recommendationService;

    @PostMapping
    public ResponseEntity createRecommend(
            @RequestParam("userId") Long userId,
            @RequestParam("postId") Long postId
    ) {
        logger.info("Request to create a recommend");

        RecommendationId recommendationId = new RecommendationId(userId, postId);
        return recommendationService.createLike(userId, postId);
    }

    @GetMapping
    public ResponseEntity readPost(
            @RequestParam("userId") Long userId,
            @RequestParam("postId") Long postId
    ) {
        RecommendationId recommendationId = new RecommendationId(userId, postId);
        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(recommendationService.readLike(recommendationId))
                        .build());
    }
}
