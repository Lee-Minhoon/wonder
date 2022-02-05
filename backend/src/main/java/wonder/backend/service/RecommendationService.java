package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Recommendation;
import wonder.backend.domain.id.RecommendationId;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.RecommendationRepository;

import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class RecommendationService {
    private final Logger logger = LoggerFactory.getLogger(RecommendationService.class);

    private final RecommendationRepository recommendationRepository;

    public void createRecommendation(Recommendation recommendation) {
        validateDuplicateRecommend(recommendation);
        recommendationRepository.save(recommendation);
        return;
    }

    private void validateDuplicateRecommend(Recommendation recommendation) {
        recommendationRepository.findById(recommendation.getRecommendationId()).ifPresent(r -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

//    @Transactional(readOnly = true)
//    public boolean readRecommendation(RecommendationId recommendationId) {
//        Optional<Recommendation> like = recommendationRepository.findById(recommendationId);
//
//        return like.isPresent() ? true : false;
//    }

    public Optional<Recommendation> getRecommendationById(RecommendationId id) {
        return recommendationRepository.findById(id);
    }
}