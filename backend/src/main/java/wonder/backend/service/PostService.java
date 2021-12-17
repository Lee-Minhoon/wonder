package wonder.backend.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import wonder.backend.dto.PostsResponseDto;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class PostService {
    private final Logger logger = LoggerFactory.getLogger(PostService.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public ResponseEntity createPost(String userEmail, String title, String content) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        user.get().add(post);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @Transactional(readOnly = true)
    public List<PostsResponseDto> readAllPost(int page, int size) {
//        PageRequest pageRequest = PageRequest.of(page, size);
        return postRepository.findAll()
                .stream()
                .map(posts -> new PostsResponseDto(posts))
//                .map(PostsResponseDto::new)
                .collect(Collectors.toList());
    }
}