package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.User;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CategoryService;
import wonder.backend.service.PostService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @GetMapping("/me")
    public ResponseEntity readMe(
            HttpServletRequest request
    ) {
        logger.info("Request to read a user");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readUser(user))
                        .build());
    }

    @GetMapping("{id}")
    public ResponseEntity readUser(
            @PathVariable("id") Long userId
    ) {
        logger.info("Request to read a user : {}", userId);

        User user = getOrElseThrow(userService.getUserById(userId));

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readUser(user))
                        .build());
    }

    @GetMapping()
    public ResponseEntity readAllUsers(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all users");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readAllUsers(page, size))
                        .build());
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
