package wonder.backend.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wonder.backend.domain.Post;


public interface PostRepository extends JpaRepository<Post, Long> {

}

//@Repository
//@RequiredArgsConstructor
//public class PostRepository {
//    private final EntityManager em;
//
//    public List<Post> findAll() {
//
//    }
//}