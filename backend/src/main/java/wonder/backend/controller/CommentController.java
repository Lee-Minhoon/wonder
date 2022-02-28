package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Utilities;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Comment;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.CommentDto;
import wonder.backend.dto.common.Response;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CommentService;
import wonder.backend.service.PostService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("comments")
@AllArgsConstructor
public class CommentController {
    private final Logger logger = LoggerFactory.getLogger(CommentController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;
    private final Utilities utilities;
    private final TokenProvider tokenProvider;

    @PostMapping
    public ResponseEntity createComment(
            HttpServletRequest request,
            @RequestBody CommentDto.CreateCommentDto createCommentDto
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to create comment : {} / Requested user : {}", createCommentDto.getContent(), loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Post post = utilities.getOrElseThrow(postService.getPostById(createCommentDto.getPostId()));
        Comment comment = Comment.builder()
                .content(createCommentDto.getContent())
                .user(user)
                .build();

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.CREATE_COMMENT)
                .message(ResponseMessage.CREATE_COMMENT)
                .data(commentService.createComment(comment, post))
                .build());
    }

    @GetMapping
    public ResponseEntity readComments(
            HttpServletRequest request,
            @RequestParam("post") Long postId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read comments in : {} / Requested user : {}", postId, loginUserId);

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_COMMENTS)
                .message(ResponseMessage.READ_COMMENTS)
                .data(commentService.readComments(postId, pageable))
                .build());
    }

    @PutMapping("{id}")
    public ResponseEntity updateComment(
            HttpServletRequest request,
            @PathVariable("id") Long commentId,
            @RequestBody CommentDto.UpdatePostDto updatePostDto
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to update comment : {} / Requested user : {}", commentId, loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Comment comment = utilities.getOrElseThrow(commentService.getCommentById(commentId));
        comment.setContent(updatePostDto.getContent());

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.UPDATE_COMMENT)
                .data(commentService.updateComment(comment, user))
                .message(ResponseMessage.UPDATE_COMMENT)
                .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteComment(
            HttpServletRequest request,
            @AuthenticationPrincipal String email,
            @PathVariable("id") Long commentId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to delete comment : {} / Requested user : {}", commentId, loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Comment comment = utilities.getOrElseThrow(commentService.getCommentById(commentId));
        commentService.deleteComment(comment, user);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_COMMENT)
                .message(ResponseMessage.DELETE_COMMENT)
                .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }
}
