package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.PrincipalDetails;
import wonder.backend.domain.User;
import wonder.backend.dto.AuthDto;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.AuthService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Optional;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .data(authService.signup(user))
                        .message(ResponseMessage.SUCCESS)
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

        User user = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        user.setLoggedInAt(new Timestamp(System.currentTimeMillis()));

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        AuthDto.LoginResponseDto loginResponseDto = AuthDto.LoginResponseDto.builder()
                .id(principalDetails.getId())
                .nickname(principalDetails.getNickname())
                .token(jwt)
                .build();

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(loginResponseDto)
                        .build());
    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
