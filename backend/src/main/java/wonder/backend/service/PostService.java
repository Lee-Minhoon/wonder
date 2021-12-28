package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Category;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.Response;
import wonder.backend.dto.mapper.PostInterface;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.CategoryRepository;
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
    private final CategoryRepository categoryRepository;

    public ResponseEntity createPost(String userEmail, Long categoryId, String title, String content) {
        User user = getUserByEmail(userEmail);

        Post post = Post.builder()
                .category(getCategoryById(categoryId))
                .title(title)
                .content(content)
                .build();

        user.add(post);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @Transactional(readOnly = true)
    public PostDto readPost(Long id) {
        return PostDto.builder()
                .postInterface(getPostById(id))
                .build();
    }

    @Transactional(readOnly = true)
    public List<PostDto> readAllPost(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findAllPostByCategory(categoryId, pageable)
                .stream()
                .map(PostDto::new)
                .collect(Collectors.toList());
    }

    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        category.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return category.get();
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return user.get();
    }

    public PostInterface getPostById(Long id) {
        Optional<PostInterface> post = postRepository.findPost(id);
        post.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return post.get();
    }
}