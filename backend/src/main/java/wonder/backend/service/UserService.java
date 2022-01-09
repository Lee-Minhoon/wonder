package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.User;
import wonder.backend.dto.PageDto;
import wonder.backend.dto.UserDto;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageDto readAllUser(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> result = userRepository.findAll(pageable);
        return PageDto.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(UserDto.ReadUserDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public UserDto.ReadUserDto readUser(Long id) {
        return UserDto.ReadUserDto.builder()
                .user(getUserById(id))
                .build();
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
        return user.get();
    }
}