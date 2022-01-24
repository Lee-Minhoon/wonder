package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Comment;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.CommentDto;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.mapper.CommentMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.CommentRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class CommentService {
    private final Logger logger = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;

    public Long createComment(Comment comment, Post post) {
        post.add(comment);
        commentRepository.save(comment);
        return comment.getId();
    }

    @Transactional(readOnly = true)
    public ResponsePage readAllComments(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CommentMapper> result = commentRepository.findAllCommentByPost(postId, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(CommentDto.ReadCommentDto::new).collect(Collectors.toList()))
                .build();
    }

    public Long updateComment(Comment comment, User user) {
        validateAuthor(comment, user);
        commentRepository.save(comment);
        return comment.getId();
    }

    public void deleteComment(Comment comment, User user) {
        validateAuthor(comment, user);
        commentRepository.delete(comment);
        return;
    }

    public void validateAuthor(Comment comment, User user) {
        if(comment.getUser().getId() != user.getId()) new CustomException(ExceptionEnum.UNAUTHORIZED);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
}