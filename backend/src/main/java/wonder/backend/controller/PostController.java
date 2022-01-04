package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Post;
import wonder.backend.dto.PostInputDto;
import wonder.backend.dto.Response;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.PostService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("post")
@AllArgsConstructor
public class PostController {
    private final Logger logger = LoggerFactory.getLogger(PostController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final PostService postService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping
    public ResponseEntity createPost(
            HttpServletRequest request,
            @RequestBody PostInputDto post
    ) {
        logger.info("Request to create a post : {}", post.getTitle());

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        String userEmail = tokenProvider.getUserEmail(jwt);

        return postService.createPost(userEmail, post.getCategory(), post.getTitle(), post.getContent());
    }

    @GetMapping
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

    @GetMapping("{id}")
    public ResponseEntity readPost(
            @PathVariable("id") Long id
    ) {
        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readPost(id))
                        .build());
    }
}
