package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.dto.CommentDto;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.Response;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CommentService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("comments")
@AllArgsConstructor
public class CommentController {
    private final Logger logger = LoggerFactory.getLogger(CommentController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final CommentService commentService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping
    public ResponseEntity createComment(
            HttpServletRequest request,
            @RequestBody CommentDto.CreateCommentDto comment
    ) {
        logger.info("Request to create a comment : {}", comment.getContent());

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return commentService.createComment(userEmail, comment.getPost(), comment.getContent());
    }

    @GetMapping
    public ResponseEntity readAllComment(
            @RequestParam("post") Long postId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(commentService.readAllComment(postId, page, size))
                        .build());
    }

    @PutMapping("{id}")
    public ResponseEntity updateComment(
            HttpServletRequest request,
            @PathVariable("id") Long commentId,
            @RequestBody CommentDto.UpdatePostDto comment
    ) {
        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return commentService.updateComment(commentId, userEmail, comment.getContent());
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteComment(
            HttpServletRequest request,
            @AuthenticationPrincipal String email,
            @PathVariable("id") Long commentId
    ) {
        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return commentService.deleteComment(commentId, userEmail);
    }
}
