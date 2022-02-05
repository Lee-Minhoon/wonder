package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Follow;
import wonder.backend.domain.id.FollowId;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.FollowRepository;

import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class FollowService {
    private final Logger logger = LoggerFactory.getLogger(FollowService.class);

    private final FollowRepository followRepository;

    public void createFollow(Follow follow) {
        validateDuplicateFollow(follow);
        followRepository.save(follow);
        return;
    }

    private void validateDuplicateFollow(Follow follow) {
        followRepository.findById(follow.getFollowId()).ifPresent(r -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

    public Optional<Follow> getFollowById(FollowId id) {
        return followRepository.findById(id);
    }
}