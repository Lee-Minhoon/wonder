package wonder.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import wonder.backend.domain.Response;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.constants.StatusCode;
import wonder.backend.domain.User;
import wonder.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 회원 가입
     **/
    public ResponseEntity<Response<User>> signup(User user) {

        Response<User> body;

        boolean result = userRepository.findById(user.getId()).isEmpty();
        if (result) {
            userRepository.save(user);
            body = new Response<User>(StatusCode.OK, ResponseMessage.SIGNUP_SUCCESS, user);
        }
        else {
            body = new Response<User>(StatusCode.CONFLICT, ResponseMessage.ID_DUPLICATE, user);
        }

        return new ResponseEntity<Response<User>>(body, null, HttpStatus.OK);
    }

    public ResponseEntity<Response<String>> login(String id, String password) {

        Response<String> body;

        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            boolean validation = result.stream().anyMatch(user -> user.getPassword().equals(password));
            if (validation) {
                body = new Response<String>(StatusCode.OK, ResponseMessage.LOGIN_SUCCESS, "success");
            }
            else {
                body = new Response<String>(StatusCode.UNAUTHORIZED, ResponseMessage.LOGIN_FAIL_INVALID_PASSWORD, "fail");
            }
        } else {
            body = new Response<String>(StatusCode.UNAUTHORIZED, ResponseMessage.LOGIN_FAIL_INVALID_ID, "fail");
        }

        return new ResponseEntity<Response<String>>(body, null, HttpStatus.OK);
    }


    /**
     * 전체 회원 조회
     **/
    public List<User> findMembers() {
        return userRepository.findAll();
    }

//    public Optional<User> findOne(Long memberId) {
//        return userRepository.findById(memberId);
//    }
}