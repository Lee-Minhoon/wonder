package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import wonder.backend.domain.User;
import wonder.backend.service.UserService;

@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("user")
    @ResponseBody
    public User singup(
            @RequestParam("id") String id,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        User user = new User();
        user.setId(id);
        user.setPassword(password);
        user.setNickname(nickname);

        userService.signup(user);

        System.out.println("test");

        return user;
    }
}
