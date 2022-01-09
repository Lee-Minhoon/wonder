package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.Response;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.PostService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
@AllArgsConstructor
public class PostController {
    private final Logger logger = LoggerFactory.getLogger(PostController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final PostService postService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("posts")
    public ResponseEntity createPost(
            HttpServletRequest request,
            @RequestBody PostDto.CreatePostDto post
    ) {
        logger.info("Request to create a post : {}", post.getTitle());

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return postService.createPost(userEmail, post.getCategory(), post.getTitle(), post.getContent());
    }

    @GetMapping("posts/{id}")
    public ResponseEntity readPost(
            @PathVariable("id") Long postId
    ) {
        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readPost(postId))
                        .build());
    }

    @GetMapping("posts")
    public ResponseEntity readAllPost(
            @RequestParam("category") Long categoryId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readAllPost(categoryId, page, size))
                        .build());
    }

    @GetMapping("users/{id}/posts")
    public ResponseEntity readAllPostByUser(
            @PathVariable("id") Long userId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readAllPostByUser(userId, page, size))
                        .build());
    }

    @PutMapping("posts/{id}")
    public ResponseEntity updatePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId,
            @RequestBody PostDto.UpdatePostDto post
    ) {
        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return postService.updatePost(postId, userEmail, post.getTitle(), post.getContent());
    }

    @DeleteMapping("posts/{id}")
    public ResponseEntity deletePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId
    ) {
        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return postService.deletePost(postId, userEmail);
    }
}
