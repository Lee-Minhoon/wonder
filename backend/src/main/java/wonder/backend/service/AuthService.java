package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.PrincipalDetails;
import wonder.backend.domain.User;
import wonder.backend.exception.CustomException;
import wonder.backend.repository.UserRepository;

@Service @Transactional
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;

    public Long signup(User user) {
        validateDuplicateUser(user);
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateUser(User user) {
        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new CustomException(ExceptionEnum.DUPLICATE);
        });
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .map(user -> new PrincipalDetails(user))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}