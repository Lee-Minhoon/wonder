package wonder.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.constants.StatusCode;
import wonder.backend.domain.PrincipalDetails;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.repository.UserRepository;

import java.util.Optional;

@Service @Transactional
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final UserRepository userRepository;

    public ResponseEntity<Response<User>> signup(User user) {
        logger.info("Service:: UserService / call Signup");

        Response<User> body;
        boolean result = userRepository.findByEmail(user.getEmail()).isEmpty();

        if (result) {
            userRepository.save(user);
            body = new Response<User>(StatusCode.OK, ResponseMessage.SIGNUP_SUCCESS);
        } else {
            body = new Response<User>(StatusCode.CONFLICT, ResponseMessage.ID_DUPLICATE);
        }

        logger.info("Service:: UserService / end Signup");
        return new ResponseEntity<Response<User>>(body, null, HttpStatus.OK);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Service:: UserService / call loadUserByUsername");
        Optional<User> user = userRepository.findByEmail(username).orElse(user.Entity());

        Optional<User> user = userRepository.findByEmail(username)
        user.orElse()

        if(user.isEmpty()) {
            return null;
        }

        logger.info("Service:: UserService / end loadUserByUsername");
        return new PrincipalDetails(user.get());
    }
}