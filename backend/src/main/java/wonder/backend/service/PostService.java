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
import wonder.backend.dto.Response;
import wonder.backend.domain.User;
import wonder.backend.dto.PostResponseDto;
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
    public List<PostResponseDto> readAllPost(int page, int size) {
//        PageRequest pageRequest = PageRequest.of(page, size);
        return postRepository.findAll()
                .stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostResponseDto readPost(Long id) {
        Optional<Post> post = postRepository.findById(id);
        post.orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        return PostResponseDto.builder()
                .post(postRepository.findById(id).get())
                .build();
    }
}