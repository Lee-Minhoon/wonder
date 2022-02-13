package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Follow;
import wonder.backend.domain.User;
import wonder.backend.domain.id.FollowId;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.FollowRepository;

import java.util.Optional;
import java.util.Set;

@Service @Transactional
@RequiredArgsConstructor
public class FollowService {
    private final Logger logger = LoggerFactory.getLogger(FollowService.class);

    private final FollowRepository followRepository;

    public void createFollow(Follow follow, User follower, User followee) {
        validateDuplicateFollow(follow);
        follower.addFollowee(follow);
        followee.addFollower(follow);
        followRepository.save(follow);
        return;
    }

    private void validateDuplicateFollow(Follow follow) {
        followRepository.findById(follow.getFollowId()).ifPresent(r -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

    public void deleteFollow(Follow follow, User follower) {
        validateAuthor(follow, follower);
        followRepository.delete(follow);
        return;
    }

    public void validateAuthor(Follow follow, User follower) {
        if(follow.getFollower().getId() != follower.getId()) new CustomException(ExceptionEnum.UNAUTHORIZED);
    }

    @Transactional(readOnly = true) //페이지처리랑 n+1문제 처리못해 <<
    public void getFollowers(User user) {
        Set<Follow> followers = user.getFollowers();
//        List<Follow> followList = em.createQuery("SELECT u FROM user as u" +
//                        " JOIN FETCH u.followers as uf WHERE uf.followerId = u.id", Follow.class)
//                .setParameter("followeeId", user.getId())
//                .setMaxResults(10).getResultList();
        followers.stream().forEach((f)-> System.out.println(f.getFollower().getId() + "-> follow plz ->" + f.getFollowee().getId()));
        return;
    }

    public Optional<Follow> getFollowById(FollowId id) {
        return followRepository.findById(id);
    }
}