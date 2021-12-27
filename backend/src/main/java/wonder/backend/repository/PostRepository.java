package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wonder.backend.domain.Post;
import wonder.backend.dto.PostInterface;
import wonder.backend.dto.TestDto;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT p.content, count(*) amount FROM POST as p RIGHT JOIN RECOMMENDATION as r on p.id = r.post_id group by p.id", nativeQuery = true)
    List<PostInterface> findTest(@Param("id") Long id);

//    @Query(value = "SELECT p.id FROM POST as p", nativeQuery = true)
//    List<TestDto> findTest();
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