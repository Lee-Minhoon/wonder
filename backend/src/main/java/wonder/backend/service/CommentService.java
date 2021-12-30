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
import wonder.backend.domain.Comment;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.CommentDto;
import wonder.backend.dto.PageDto;
import wonder.backend.dto.Response;
import wonder.backend.dto.mapper.CommentInterface;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.CommentRepository;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class CommentService {
    private final Logger logger = LoggerFactory.getLogger(CommentService.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public ResponseEntity createComment(String userEmail, Long postId, String content) {
        User user = getUserByEmail(userEmail);
        Post post = getPostById(postId);

        Comment comment = Comment.builder()
                .content(content)
                .user(user)
                .build();

        post.add(comment);
        commentRepository.save(comment);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @Transactional(readOnly = true)
    public PageDto readAllComment(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CommentInterface> result = commentRepository.findAllCommentByPost(postId, pageable);
        return PageDto.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(CommentDto::new).collect(Collectors.toList()))
                .build();
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return user.get();
    }

    public Post getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        post.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return post.get();
    }
}