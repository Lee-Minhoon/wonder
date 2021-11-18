package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Response;
import wonder.backend.common.ResponseMessage;
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
    public Response<User> singup(
            @RequestParam("id") String id,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        User user = new User();
        user.setId(id);
        user.setPassword(password);
        user.setNickname(nickname);

        if(userService.signup(user)) {
            return new Response<User>(ResponseMessage.SIGNUP_SUCCESS, user);
        }
        else {
            return new Response<User>(ResponseMessage.ID_DUPLICATE, user);
        }
    }
}
