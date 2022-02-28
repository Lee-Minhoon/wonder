package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Utilities;
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
    private final Utilities utilities;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("posts")
    public ResponseEntity createPost(
            HttpServletRequest request,
            @RequestBody PostDto.CreatePostDto createPostDto
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to create post : {} / Requested user : {}", createPostDto.getTitle(), loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Category category = utilities.getOrElseThrow(categoryService.getCategoryById(createPostDto.getCategory()));
        Post post = Post.builder()
                .category(category)
                .title(createPostDto.getTitle())
                .content(createPostDto.getContent())
                .build();

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.CREATE_POST)
                .message(ResponseMessage.CREATE_POST)
                .data(postService.createPost(post, user))
                .build());
    }

    @GetMapping("posts/{id}")
    public ResponseEntity readPost(
            HttpServletRequest request,
            @PathVariable("id") Long postId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read post : {} / Requested user : {}", postId, loginUserId);

        PostMapper.ReadPostMapper postMapper = utilities.getOrElseThrow(postService.getPostInfoById(postId));

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_POST)
                .message(ResponseMessage.READ_POST)
                .data(postService.readPost(postMapper))
                .build());
    }

    @GetMapping("posts")
    public ResponseEntity readPostsByCategory(
            HttpServletRequest request,
            @RequestParam("category") Long categoryId,
            @RequestParam("title") String title,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read posts by category : {} / Requested user : {}", categoryId, loginUserId);

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_POSTS_BY_CATEGORY)
                .message(ResponseMessage.READ_POSTS_BY_CATEGORY)
                .data(postService.readPostsByCategory(categoryId, title, pageable))
                .build());
    }

    @GetMapping("users/{id}/posts")
    public ResponseEntity readPostsByUser(
            HttpServletRequest request,
            @PathVariable("id") Long userId,
            @RequestParam("title") String title,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read posts by user : {} / Requested user : {}", userId, loginUserId);

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_POSTS_BY_USER)
                .message(ResponseMessage.READ_POSTS_BY_USER)
                .data(postService.readPostsByUser(userId, title, pageable))
                .build());
    }

    @PutMapping("posts/{id}")
    public ResponseEntity updatePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId,
            @RequestBody PostDto.UpdatePostDto updatePostDto
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to update post : {} / Requested user : {}", postId, loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Post post = utilities.getOrElseThrow(postService.getPostById(postId));
        post.setTitle(updatePostDto.getTitle());
        post.setContent(updatePostDto.getContent());

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.UPDATE_POST)
                .message(ResponseMessage.UPDATE_POST)
                .data(postService.updatePost(post, user))
                .build());
    }

    @DeleteMapping("posts/{id}")
    public ResponseEntity deletePost(
            HttpServletRequest request,
            @PathVariable("id") Long postId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to delete post : {}", postId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        Post post = utilities.getOrElseThrow(postService.getPostById(postId));
        postService.deletePost(post, user);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_POST)
                .message(ResponseMessage.DELETE_POST)
                .build());
    }


    @GetMapping("posts/test")
    public ResponseEntity readTest(
            @RequestParam("category") Long categoryId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .data(postService.readTest(categoryId, page, size))
                .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }
}
