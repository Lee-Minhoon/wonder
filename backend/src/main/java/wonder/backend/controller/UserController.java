package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Response;
import wonder.backend.domain.Token;
import wonder.backend.domain.User;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("signup")
    public ResponseEntity signup(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        logger.info("call signup");
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setNickname(nickname);

        logger.info("end signup");
        return userService.signup(user);
    }

    @PostMapping("login")
    public ResponseEntity login(
            HttpServletResponse response,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        // 인증 객체 생성 및 반환
        logger.info("call login");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        logger.info("authenticationToken: {}", authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        logger.info("authentication: {}", authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // jwt 생성
        String jwt = tokenProvider.createToken(authentication);
        logger.info("created jwt: {}", jwt);

        // jwt 쿠키로 반환
        Cookie cookie = new Cookie("token", jwt);
        response.addCookie(cookie);

        logger.info("end login");
        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.LOGIN_SUCCESS)
                        .message(ResponseMessage.LOGIN_SUCCESS)
                        .data(new Token(jwt))
                        .build());
    }

    @GetMapping("test")
    public ResponseEntity test() {
        return ResponseEntity.ok("test");
    }
}
