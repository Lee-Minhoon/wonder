package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Post;
import wonder.backend.domain.Recommendation;
import wonder.backend.domain.User;
import wonder.backend.domain.id.RecommendationId;
import wonder.backend.dto.RecommendationDto;
import wonder.backend.dto.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.RecommendationRepository;
import wonder.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class RecommendationService {
    private final Logger logger = LoggerFactory.getLogger(RecommendationService.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final RecommendationRepository recommendationRepository;


    public ResponseEntity createLike(Long userId, Long postId) {
        RecommendationId recommendationId = new RecommendationId(userId, postId);
        validateDuplicateRecommend(recommendationId);

        Post post = getPost(postId);

        Recommendation recommendation = Recommendation.builder()
                .recommendationId(recommendationId)
                .user(getUser(userId))
                .build();

        post.add(recommendation);
        recommendationRepository.save(recommendation);

        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    private void validateDuplicateRecommend(RecommendationId recommendationId) {
        recommendationRepository.findById(recommendationId).ifPresent(u -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

    @Transactional(readOnly = true)
    public boolean readLike(RecommendationId recommendationId) {
        Optional<Recommendation> like = recommendationRepository.findById(recommendationId);

        return like.isPresent() ? true : false;
    }

    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));

        return user.get();
    }

    public Post getPost(Long id) {
        Optional<Post> post = postRepository.findById(id);
        post.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));

        return post.get();
    }
}