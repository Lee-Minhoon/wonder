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
import wonder.backend.common.Utilities;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.User;
import wonder.backend.dto.common.Response;
import wonder.backend.dto.mapper.UserMapper;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.FirebaseService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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
    private final Utilities utilities;

    @Value("${app.firebase.private-url}")
    private String fireBasePrivateUrl;
    @Value("${app.firebase.public-url}")
    private String fireBasePublicUrl;

    @GetMapping("/me")
    public ResponseEntity readMe(
            HttpServletRequest request
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read me : {} / Requested user : {}", loginUserId, loginUserId);

        UserMapper.ReadUserMapper userMapper = Utilities.getOrElseThrow(userService.getUserInfoById(0L, loginUserId));

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_ME_SUCCESS)
                .message(ResponseMessage.READ_ME_SUCCESS)
                .data(userService.readUser(userMapper))
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity readUser(
            HttpServletRequest request,
            @PathVariable("id") Long userId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read user : {} / Requested user : {}", userId, loginUserId);

        UserMapper.ReadUserMapper userMapper = utilities.getOrElseThrow(userService.getUserInfoById(loginUserId, userId));

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_USER_SUCCESS)
                .message(ResponseMessage.READ_USER_SUCCESS)
                .data(userService.readUser(userMapper))
                .build());
    }

    @GetMapping("{id}/followers")
    public ResponseEntity readFollowers(
            HttpServletRequest request,
            @PathVariable("id") Long followeeId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read followers : {} / Requested user : {}", followeeId, loginUserId);

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_FOLLOWERS_SUCCESS)
                .message(ResponseMessage.READ_FOLLOWERS_SUCCESS)
                .data(userService.readFollowers(loginUserId, followeeId, pageable))
                .build());
    }

    @GetMapping("{id}/followees")
    public ResponseEntity readFollowees(
            HttpServletRequest request,
            @PathVariable("id") Long followerId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to read followees : {} / Requested user : {}", followerId, loginUserId);

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_FOLLOWEES_SUCCESS)
                .message(ResponseMessage.READ_FOLLOWEES_SUCCESS)
                .data(userService.readFollowees(loginUserId, followerId, pageable))
                .build());
    }

    @PutMapping("me")
    public ResponseEntity updateMe(
            MultipartHttpServletRequest request
    ) throws IOException {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to update user : {} / Requested user : {}", loginUserId, loginUserId);

        User user = utilities.getOrElseThrow(userService.getUserById(loginUserId));

        MultipartFile profile = request.getFile("profileImageFile");
        if(profile != null) {
            String profileImageUrl = firebaseService.uploadFiles(profile, profile.getName() + loginUserId);
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

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.UPDATE_ME_SUCCESS)
                .message(ResponseMessage.UPDATE_ME_SUCCESS)
                .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }
}
