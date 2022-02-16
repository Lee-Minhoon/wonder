package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;
import wonder.backend.dto.UserDto;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.mapper.UserMapper;
import wonder.backend.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserDto.ReadUserDto readUser(UserMapper.ReadUserMapper userMapper) {
        return UserDto.ReadUserDto.builder()
                .userMapper(userMapper)
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readAllFollowers(Long loginUserId, Long followeeId, Pageable pageable) {
        Page<UserMapper.ReadAllUsersMapper> result = userRepository.findAllFollowersById(loginUserId, followeeId, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(UserDto.ReadAllUsersDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readAllFollowees(Long loginUserId, Long followerId, Pageable pageable) {
        Page<UserMapper.ReadAllUsersMapper> result = userRepository.findAllFolloweesById(loginUserId, followerId, pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(UserDto.ReadAllUsersDto::new).collect(Collectors.toList()))
                .build();
    }

    public void updateUser(User user) {
        userRepository.save(user);
        return;
    }

    public Optional<UserMapper.ReadUserMapper> getUserInfoById(Long loginUserId, Long id) {
        return userRepository.findUserInfoById(loginUserId, id);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }
}