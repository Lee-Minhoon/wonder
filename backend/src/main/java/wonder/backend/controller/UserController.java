package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("signup")
    public ResponseEntity<Response<User>> singup(
            @RequestParam("id") String id,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        User user = new User();
        user.setId(id);
        user.setPassword(passwordEncoder.encode(password));
        user.setNickname(nickname);
        user.setRole("USER");

        return userService.signup(user);
    }

    @PostMapping("login")
    public ResponseEntity<Response<User>> login(
            @RequestParam("id") String id,
            @RequestParam("password") String password
    ) {
        return userService.login(id, password);
    }
}
