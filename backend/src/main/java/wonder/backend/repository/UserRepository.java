package wonder.backend.repository;

import wonder.backend.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User member);
    Optional<User> findById(String id);
    List<User> findAll();

}
