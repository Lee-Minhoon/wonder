package wonder.backend.service;

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
    public boolean signup(User user) {
        boolean result = userRepository.findById(user.getId()).isEmpty();
        if (result) {
            userRepository.save(user);
            return true;
        }
        else {
            return false;
        }
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