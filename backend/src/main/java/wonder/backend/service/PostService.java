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
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.mapper.PostMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.PostRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class PostService {
    private final Logger logger = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    public Long createPost(Post post, User user) {
        user.addPost(post);
        postRepository.save(post);
        return post.getId();
    }

    @Transactional(readOnly = true)
    public PostDto.ReadPostDto readPost(PostMapper.ReadPostMapper postMapper) {
        return PostDto.ReadPostDto.builder()
                .postMapper(postMapper)
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readPostsByCategory(Long categoryId, String title, Pageable pageable) {
        Page<PostMapper.ReadAllPostsMapper> result = postRepository.findPostsByCategory(categoryId, title, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(PostDto.ReadPostsDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readPostsByUser(Long userId, String title, Pageable pageable) {
        Page<PostMapper.ReadAllPostsMapper> result = postRepository.findPostsByUser(userId, title, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(PostDto.ReadPostsDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readTest(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostMapper.ReadAllPostsMapper> result = postRepository.findTest(categoryId, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(PostDto.ReadPostsDto::new).collect(Collectors.toList()))
                .build();
    }

    public Long updatePost(Post post, User user) {
        validateAuthor(post, user);
        postRepository.save(post);
        return post.getId();
    }

    public void deletePost(Post post, User user) {
        validateAuthor(post, user);
        postRepository.delete(post);
        return;
    }

    public void validateAuthor(Post post, User user) {
        if(post.getUser().getId() != user.getId()) {
            throw new CustomException(ExceptionEnum.UNAUTHORIZED);
        }
    }

    public Optional<PostMapper.ReadPostMapper> getPostInfoById(Long id) {
        return postRepository.findPostInfoById(id);
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }
}