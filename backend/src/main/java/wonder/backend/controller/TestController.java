package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.domain.User;
import wonder.backend.repository.UserRepository;

@RestController
@RequestMapping("api")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @GetMapping("join")
    public ResponseEntity<String> join() {
        User user = new User();
        user.setId("test1");
        user.setPassword(passwordEncoder.encode("123123123"));
        user.setNickname("nickname");

        userRepository.save(user);

        return ResponseEntity.ok("ok");
    }
}
