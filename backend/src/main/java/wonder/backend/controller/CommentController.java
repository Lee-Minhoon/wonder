package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Comment;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.CommentDto;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CommentService;
import wonder.backend.service.PostService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("comments")
@AllArgsConstructor
public class CommentController {
    private final Logger logger = LoggerFactory.getLogger(CommentController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping
    public ResponseEntity createComment(
            HttpServletRequest request,
            @RequestBody CommentDto.CreateCommentDto createCommentDto
    ) {
        logger.info("Request to create a comment : {}", createCommentDto.getContent());

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Post post = getOrElseThrow(postService.getPostById(createCommentDto.getPostId()));
        Comment comment = Comment.builder()
                .content(createCommentDto.getContent())
                .user(user)
                .build();

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(commentService.createComment(comment, post))
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @GetMapping
    public ResponseEntity readAllComments(
            @RequestParam("post") Long postId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(commentService.readAllComments(postId, page, size))
                        .build());
    }

    @PutMapping("{id}")
    public ResponseEntity updateComment(
            HttpServletRequest request,
            @PathVariable("id") Long commentId,
            @RequestBody CommentDto.UpdatePostDto updatePostDto
    ) {
        logger.info("Request to update a post : {}", commentId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Comment comment = getOrElseThrow(commentService.getCommentById(commentId));
        comment.setContent(updatePostDto.getContent());

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(commentService.updateComment(comment, user))
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteComment(
            HttpServletRequest request,
            @AuthenticationPrincipal String email,
            @PathVariable("id") Long commentId
    ) {
        logger.info("Request to delete a post : {}", commentId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Comment comment = getOrElseThrow(commentService.getCommentById(commentId));
        commentService.deleteComment(comment, user);

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
