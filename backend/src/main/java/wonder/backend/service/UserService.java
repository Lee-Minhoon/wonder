package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.User;
import wonder.backend.dto.UserDto;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional
@RequiredArgsConstructor
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserDto> readAllPost(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return userRepository.findAll(pageRequest)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDto readPost(Long id) {
        Optional<User> user = userRepository.findById(id);
        user.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));

        return UserDto.builder()
                .user(user.get())
                .build();
    }
}