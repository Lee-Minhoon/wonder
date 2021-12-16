package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wonder.backend.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {


}
