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
    public Long signup(User user) {
        validateDuplicateUser(user); // 중복 회원 검증
        userRepository.save(user);
        return user.getNumber();
    }

    private void validateDuplicateUser(User user) {
        userRepository.findById(user.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
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