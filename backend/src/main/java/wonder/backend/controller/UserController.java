package wonder.backend.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import wonder.backend.domain.Response;
import wonder.backend.domain.User;
import wonder.backend.jwt.JwtFilter;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.UserService;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("signup")
    public ResponseEntity<Response<User>> signup(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname
    ) {
        logger.info("Controller:: UserController / call signup");
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setNickname(nickname);

        logger.info("Controller:: UserController / end signup");
        return userService.signup(user);
    }

    @GetMapping("login")
    public ResponseEntity<String> login() {
        // 인증 객체 생성 및 반환
        logger.info("Controller:: UserController / call login");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken("test1", "123123123");
        logger.info("Controller:: UserController / authenticationToken: {}", authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        logger.info("Controller:: UserController / authentication: {}", authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // jwt 토큰 헤더에 담아 반환
        String jwt = tokenProvider.createToken(authentication);
        logger.info("Controller:: UserController / created jwt: {}", jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        logger.info("Controller:: UserController / end login");
        return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        // 인증 객체 생성 및 반환
        logger.info("Controller:: UserController / call login");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        logger.info("Controller:: UserController / authenticationToken: {}", authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        logger.info("Controller:: UserController / authentication: {}", authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // jwt 토큰 헤더에 담아 반환
        String jwt = tokenProvider.createToken(authentication);
        logger.info("Controller:: UserController / created jwt: {}", jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        logger.info("Controller:: UserController / end login");
        return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("ok");
    }
}
