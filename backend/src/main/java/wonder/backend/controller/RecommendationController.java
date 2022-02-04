package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Post;
import wonder.backend.domain.Recommendation;
import wonder.backend.domain.User;
import wonder.backend.domain.id.RecommendationId;
import wonder.backend.dto.RecommendationDto;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.PostService;
import wonder.backend.service.RecommendationService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("recommendation")
@AllArgsConstructor
public class RecommendationController {
    private final Logger logger = LoggerFactory.getLogger(RecommendationController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final PostService postService;
    private final RecommendationService recommendationService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping
    public ResponseEntity createRecommendation(
            HttpServletRequest request,
            @RequestBody RecommendationDto.CreateRecommendationDto createRecommendationDto
    ) {
        logger.info("Request to create a recommend");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Post post = getOrElseThrow(postService.getPostById(createRecommendationDto.getPostId()));
        RecommendationId recommendationId = new RecommendationId(user.getId(), post.getId());
        Recommendation recommendation = Recommendation.builder()
                .recommendationId(recommendationId)
                .user(user)
                .post(post)
                .build();
        recommendationService.createRecommendation(recommendation);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
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
                        .data(recommendationService.readRecommendation(recommendationId))
                        .build());
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
