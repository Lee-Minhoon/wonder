package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.common.Utilities;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.User;
import wonder.backend.dto.AuthDto;
import wonder.backend.dto.common.Response;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.AuthService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final AuthService authService;
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final Utilities utilities;

    @PostMapping("signup")
    public ResponseEntity signup(
            @RequestBody AuthDto.SignupDto signupDto
    ) {
        logger.info("Request to signup : {}", signupDto.getEmail());

        User user = User.builder()
                .email(signupDto.getEmail())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .nickname(signupDto.getNickname())
                .build();

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.SIGNUP_SUCCESS)
                .message(ResponseMessage.SIGNUP_SUCCESS)
                .data(authService.signup(user))
                .build());
    }

    @PostMapping("login")
    public ResponseEntity login(
            HttpServletResponse response,
            @RequestBody AuthDto.LoginRequestDto loginRequestDto
    ) {
        logger.info("Request to login : {}", loginRequestDto.getEmail());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);
        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .sameSite("None")
                .secure(true)
                .path("/")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        User user = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        user.setLoggedInAt(new Timestamp(System.currentTimeMillis()));
        user.setExp(user.getExp() + 1);
        userService.updateUser(user);

        AuthDto.LoginResponseDto loginResponseDto = AuthDto.LoginResponseDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .token(jwt)
                .build();

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.LOGIN_SUCCESS)
                .message(ResponseMessage.LOGIN_SUCCESS)
                .data(loginResponseDto)
                .build());
    }
}
