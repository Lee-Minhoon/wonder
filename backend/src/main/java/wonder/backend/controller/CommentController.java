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
        logger.info("Request to create comment : {}", createCommentDto.getContent());

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
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
            @RequestParam("post") Long postId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read comments by post : {}", postId);

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
        logger.info("Request to update comment : {}", commentId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
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
        logger.info("Request to delete comment : {}", commentId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Comment comment = utilities.getOrElseThrow(commentService.getCommentById(commentId));
        commentService.deleteComment(comment, user);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_COMMENT)
                .message(ResponseMessage.DELETE_COMMENT)
                .build());
    }
}
