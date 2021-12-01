package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wonder.backend.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(String id);
}
