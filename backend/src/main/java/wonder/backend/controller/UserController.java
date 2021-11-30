package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Response;
import wonder.backend.common.ResponseMessage;
import wonder.backend.common.StatusCode;
import wonder.backend.domain.User;
import wonder.backend.service.UserService;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("user/signup")
    public ResponseEntity<Response<User>> singup(
            @RequestParam("id") String id,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        User user = new User();
        user.setId(id);
        user.setPassword(password);
        user.setNickname(nickname);

        Response<User> body;

        if(userService.signup(user)) {
            body = new Response<User>(StatusCode.OK, ResponseMessage.SIGNUP_SUCCESS, user);
        }
        else {
            body = new Response<User>(StatusCode.CONFLICT, ResponseMessage.ID_DUPLICATE, user);
        }

        return new ResponseEntity<Response<User>>(body, null, HttpStatus.OK);
    }

    @PostMapping("user/login")
    public ResponseEntity<Response<User>> login(

    ) {

    }
}
