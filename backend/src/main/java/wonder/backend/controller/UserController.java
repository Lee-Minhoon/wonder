package wonder.backend.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.User;
import wonder.backend.dto.common.Response;
import wonder.backend.dto.mapper.UserMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.FirebaseService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final FirebaseService firebaseService;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${firebase.private-url}")
    private String fireBasePrivateUrl;

    @Value("${firebase.public-url}")
    private String fireBasePublicUrl;

    @GetMapping("/me")
    public ResponseEntity readMe(
            HttpServletRequest request
    ) {
        logger.info("Request to read a user");

        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
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

        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
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

        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
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

        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readAllFollowees(loginUserId, followerId, pageable))
                        .build());
    }

    @PutMapping("me")
    public ResponseEntity updateMe(
            MultipartHttpServletRequest request
    ) throws IOException {
        logger.info("Request to update a user");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        Long userId = tokenProvider.getUserId(jwt);
        User user = getOrElseThrow(userService.getUserById(userId));

        MultipartFile profile = request.getFile("profileImageFile");
        if(profile != null) {
            String profileImageUrl = firebaseService.uploadFiles(profile, profile.getName() + userId);
            String publicImageUrl = profileImageUrl.replace(fireBasePrivateUrl, fireBasePublicUrl);
            user.setProfileImageUrl(publicImageUrl);
        }

        String password = request.getParameter("password");
        if(password.length() > 7) {
            user.setPassword(passwordEncoder.encode(password));
        }

        String nickname = request.getParameter("nickname");
        user.setNickname(nickname);

        String intro = request.getParameter("intro");
        user.setIntro(intro);

        userService.updateUser(user);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
