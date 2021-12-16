package wonder.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Post;
import wonder.backend.domain.PrincipalDetails;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.UserRepository;

import java.util.Optional;

@Service @Transactional
@AllArgsConstructor
public class PostService {
    private final Logger logger = LoggerFactory.getLogger(PostService.class);

    private final UserRepository userRepository;

    private final PostRepository postRepository;

    public ResponseEntity createPost(String userEmail, String title) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userEmail))
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        Post post = new Post();
        post.setTitle(title);

        user.get().add(post);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.POST_SUCCESS)
                        .message(ResponseMessage.POST_SUCCESS)
                        .build());
    }

}