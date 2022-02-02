package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Category;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.common.Response;
import wonder.backend.dto.mapper.PostMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CategoryService;
import wonder.backend.service.PostService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping
@AllArgsConstructor
public class PostController {
    private final Logger logger = LoggerFactory.getLogger(PostController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final PostService postService;
    private final CategoryService categoryService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("posts")
    public ResponseEntity createPost(
            HttpServletRequest request,
            @RequestBody PostDto.CreatePostDto createPostDto
    ) {
        logger.info("Request to create a post : {}", createPostDto.getTitle());

        System.out.println(request.getCookies());


        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Category category = getOrElseThrow(categoryService.getCategoryById(createPostDto.getCategory()));
        Post post = Post.builder()
                .category(category)
                .title(createPostDto.getTitle())
                .content(createPostDto.getContent())
                .build();

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(postService.createPost(post, user))
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @GetMapping("posts/{id}")
    public ResponseEntity readPost(
            @PathVariable("id") Long postId
    ) {
        logger.info("Request to read a post : {}", postId);

        PostMapper post = getOrElseThrow(postService.getPostInfoById(postId));

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readPost(post))
                        .build());
    }

    @GetMapping("posts")
    public ResponseEntity readAllPosts(
            HttpServletRequest request,
            @RequestParam("category") Long categoryId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");


        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readAllPosts(categoryId, page, size))
                        .build());
    }

    @GetMapping("users/{id}/posts")
    public ResponseEntity readAllPostsByUser(
            @PathVariable("id") Long userId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts by user : {}", userId);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(postService.readAllPostsByUser(userId, page, size))
                        .build());
    }

    @PutMapping("posts/{id}")
    public ResponseEntity updatePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId,
            @RequestBody PostDto.UpdatePostDto updatePostDto
    ) {
        logger.info("Request to update a post : {}", postId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Post post = getOrElseThrow(postService.getPostById(postId));
        post.setTitle(updatePostDto.getTitle());
        post.setContent(updatePostDto.getContent());

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(postService.updatePost(post, user))
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    @DeleteMapping("posts/{id}")
    public ResponseEntity deletePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId
    ) {
        logger.info("Request to delete a post : {}", postId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Post post = getOrElseThrow(postService.getPostById(postId));
        postService.deletePost(post, user);

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
