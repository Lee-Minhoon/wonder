package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.dto.common.Response;
import wonder.backend.dto.mapper.UserMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
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
        Long loginUserId = tokenProvider.getUserId(jwt);
        UserMapper.ReadUserMapper userMapper = getOrElseThrow(userService.getUserInfoById(0L, loginUserId));

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readUser(userMapper))
                        .build());
    }

    @GetMapping("{id}")
    public ResponseEntity readUser(
            HttpServletRequest request,
            @PathVariable("id") Long userId
    ) {
        logger.info("Request to read a user : {}", userId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        Long loginUserId = tokenProvider.getUserId(jwt) != null ? tokenProvider.getUserId(jwt) : 0;
        UserMapper.ReadUserMapper userMapper = getOrElseThrow(userService.getUserInfoById(loginUserId, userId));

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readUser(userMapper))
                        .build());
    }

    @GetMapping("{id}/followers")
    public ResponseEntity readAllFollowers(
            HttpServletRequest request,
            @PathVariable("id") Long followeeId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all followers by user");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        Long loginUserId = tokenProvider.getUserId(jwt) != null ? tokenProvider.getUserId(jwt) : 0;
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readAllFollowers(loginUserId, followeeId, pageable))
                        .build());
    }

    @GetMapping("{id}/followees")
    public ResponseEntity readAllFollowees(
            HttpServletRequest request,
            @PathVariable("id") Long followerId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all followees by user");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        Long loginUserId = tokenProvider.getUserId(jwt) != null ? tokenProvider.getUserId(jwt) : 0;
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readAllFollowees(loginUserId, followerId, pageable))
                        .build());
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
