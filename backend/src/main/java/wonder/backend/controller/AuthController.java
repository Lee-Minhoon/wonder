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
import wonder.backend.dto.Response;
import wonder.backend.dto.TokenDto;
import wonder.backend.domain.User;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.AuthService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("signup")
    public ResponseEntity signup(
            @RequestBody User user
    ) {
        logger.info("Request to signup : {}", user.getEmail());

        return userService.signup(User.builder()
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .nickname(user.getNickname())
                .build());
    }

    @PostMapping("login")
    public ResponseEntity login(
            HttpServletResponse response,
            @RequestBody User user
    ) {
        logger.info("Request to login : {}", user.getEmail());

        // 인증 객체 생성 및 반환
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // jwt 생성
        String jwt = tokenProvider.createToken(authentication);
        logger.info("Created jwt: {}", jwt);

        // jwt 쿠키로 반환
        Cookie cookie = new Cookie("token", jwt);
        response.addCookie(cookie);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(new TokenDto(jwt))
                        .build());
    }
}
