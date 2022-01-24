package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.User;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.UserDto;
import wonder.backend.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserDto.ReadUserDto readUser(User user) {
        return UserDto.ReadUserDto.builder()
                .user(user)
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> result = userRepository.findAll(pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(UserDto.ReadUserDto::new).collect(Collectors.toList()))
                .build();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}