package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Utilities;
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
    private final Utilities utilities;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("{id}")
    public ResponseEntity createRecommendation(
            HttpServletRequest request,
            @PathVariable("id") Long postId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to create recommendation in : {} / Request user : {}", postId, loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Post post = utilities.getOrElseThrow(postService.getPostById(postId));
        RecommendationId recommendationId = RecommendationId.builder()
                .userId(user.getId())
                .postId(post.getId())
                .build();
        Recommendation recommendation = Recommendation.builder()
                .recommendationId(recommendationId)
                .user(user)
                .build();
        recommendationService.createRecommendation(recommendation, post);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.CREATE_RECOMMENDATION)
                .message(ResponseMessage.CREATE_RECOMMENDATION)
                .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }
}
