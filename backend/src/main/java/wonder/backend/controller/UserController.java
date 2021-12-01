package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        user.setPassword(password);
        user.setNickname(nickname);

        return userService.signup(user);
    }

    @PostMapping("login")
    public ResponseEntity<Response<String>> login(
            @RequestParam("id") String id,
            @RequestParam("password") String password
    ) {
        return userService.login(id, password);
    }
}
