package wonder.backend.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.Post;
import wonder.backend.repository.PostRepository;
import wonder.backend.repository.UserRepository;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    PostService postService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    @Test
    public void findAllTest() throws Exception {
        // given
//        List<Post> posts = postService.readAllPost(1, 1);
//        Assertions.assertThat(posts.size()).isEqualTo(6);

        // when

        // then
    }
}