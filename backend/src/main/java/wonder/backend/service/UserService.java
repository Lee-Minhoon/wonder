package wonder.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.constants.StatusCode;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<Response<User>> signup(User user) {

        Response<User> body;

        boolean result = userRepository.findById(user.getId()).isEmpty();
        if (result) {
            userRepository.save(user);
            body = new Response<User>(StatusCode.OK, ResponseMessage.SIGNUP_SUCCESS);
        } else {
            body = new Response<User>(StatusCode.CONFLICT, ResponseMessage.ID_DUPLICATE);
        }

        return new ResponseEntity<Response<User>>(body, null, HttpStatus.OK);
    }

    public ResponseEntity<Response<User>> login(String id, String password) {

        Response<User> body;

        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            if (passwordEncoder.matches(password, result.get().getPassword())) {
                body = new Response<User>(StatusCode.UNAUTHORIZED, ResponseMessage.LOGIN_SUCCESS);
            } else {
                body = new Response<User>(StatusCode.UNAUTHORIZED, ResponseMessage.LOGIN_FAIL_INVALID_PASSWORD);
            }
        } else {
            body = new Response<User>(StatusCode.UNAUTHORIZED, ResponseMessage.LOGIN_FAIL_INVALID_ID);
        }

        return new ResponseEntity<Response<User>>(body, null, HttpStatus.OK);
    }

    public List<User> findMembers() {
        return userRepository.findAll();
    }

//    public Optional<User> findOne(Long memberId) {
//        return userRepository.findById(memberId);
//    }
}