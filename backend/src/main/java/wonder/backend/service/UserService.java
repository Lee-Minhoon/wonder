package wonder.backend.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.PrincipalDetails;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.UserRepository;

import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public ResponseEntity signup(User user) {
        validateDuplicateUser(user);
        userRepository.save(user);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    private void validateDuplicateUser(User user) {
        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new CustomException(ExceptionEnum.ID_DUPLICATE);
        });
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .map(user -> new PrincipalDetails(user))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}