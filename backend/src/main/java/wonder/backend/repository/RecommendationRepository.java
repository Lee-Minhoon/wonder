package wonder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wonder.backend.domain.Recommendation;
import wonder.backend.domain.id.RecommendationId;

import java.util.List;


public interface RecommendationRepository extends JpaRepository<Recommendation, RecommendationId> {
}