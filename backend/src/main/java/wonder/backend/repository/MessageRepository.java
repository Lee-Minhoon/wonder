package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wonder.backend.domain.Message;


public interface MessageRepository extends JpaRepository<Message, Long> {
}