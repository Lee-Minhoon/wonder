package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Follow;
import wonder.backend.domain.User;
import wonder.backend.domain.id.FollowId;
import wonder.backend.dto.FollowDto;
import wonder.backend.dto.PostDto;
import wonder.backend.dto.UserDto;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.mapper.ReadAllPostsMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.FollowRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class FollowService {
    private final Logger logger = LoggerFactory.getLogger(FollowService.class);

    private final FollowRepository followRepository;

    public void createFollow(Follow follow, User Follower, User Followee) {
        validateDuplicateFollow(follow);
        Follower.addFollowee(follow);
        Followee.addFollower(follow);
        followRepository.save(follow);
        return;
    }

    private void validateDuplicateFollow(Follow follow) {
        followRepository.findById(follow.getFollowId()).ifPresent(r -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

    @Transactional(readOnly = true)
    public ResponsePage readAllFollowersByUser(Long followeeId, Pageable pageable) {
        Page<Follow> result = followRepository.findByFolloweeId(followeeId, pageable);
//        Set<Follow> followers = user.getFollowers();
//        followers.stream().forEach((f)-> System.out.println("following to " + f.getFollowee().getId()));
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(follow -> UserDto.ReadUserDto.builder().user(follow.getFollower()).build()).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public void getFollowers(User user) {
        Set<Follow> followers = user.getFollowers();
        followers.stream().forEach((f)-> System.out.println(f.getFollower().getId() + "-> follow plz ->" + f.getFollowee().getId()));
        return;
    }

    public Optional<Follow> getFollowById(FollowId id) {
        return followRepository.findById(id);
    }
}