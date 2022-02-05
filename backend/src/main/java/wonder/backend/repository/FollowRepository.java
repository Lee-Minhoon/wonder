package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wonder.backend.domain.Follow;
import wonder.backend.domain.id.FollowId;


public interface FollowRepository extends JpaRepository<Follow, FollowId> {
}