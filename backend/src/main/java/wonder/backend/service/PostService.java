package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.PageDto;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.Response;
import wonder.backend.dto.mapper.PostMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.CategoryRepository;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.UserRepository;

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
        User user = getOrElseThrow(userRepository.findByEmail(userEmail));

        Post post = Post.builder()
                .category(getOrElseThrow(categoryRepository.findById(categoryId)))
                .title(title)
                .content(content)
                .build();

        user.add(post);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(post.getId())
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @Transactional(readOnly = true)
    public PostDto.ReadPostDto readPost(Long id) {
        return PostDto.ReadPostDto.builder()
                .postMapper(getOrElseThrow(postRepository.findPostInfoById(id)))
                .build();
    }

    @Transactional(readOnly = true)
    public PageDto readAllPost(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostMapper> result = postRepository.findAllPostByCategory(categoryId, pageable);
        return PageDto.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(PostDto.ReadAllPostDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public PageDto readAllPostByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostMapper> result = postRepository.findAllPostByUser(userId, pageable);
        return PageDto.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(PostDto.ReadAllPostDto::new).collect(Collectors.toList()))
                .build();
    }

    public ResponseEntity updatePost(Long postId, String userEmail, String title, String content) {
        Post post = getOrElseThrow(postRepository.findById(postId));
        User user = getOrElseThrow(userRepository.findByEmail(userEmail));

        if(post.getUser().getId() != user.getId()) new CustomException(ExceptionEnum.UNAUTHORIZED);

        post.setTitle(title);
        post.setContent(content);
        postRepository.save(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    public ResponseEntity deletePost(Long postId, String userEmail) {
        Post post = getOrElseThrow(postRepository.findById(postId));
        User user = getOrElseThrow(userRepository.findByEmail(userEmail));

        if(post.getUser().getId() != user.getId()) new CustomException(ExceptionEnum.UNAUTHORIZED);

        postRepository.delete(post);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}