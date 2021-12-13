package wonder.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import wonder.backend.domain.Response;
import wonder.backend.jwt.TokenProvider;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    @ExceptionHandler(value= CustomException.class)
    public ResponseEntity handler(WebRequest request, CustomException e) {
        return ResponseEntity
                .status(e.getError().getStatus())
                .body(Response.builder()
                        .code(e.getError().getCode())
                        .message(e.getError().getMessage())
                        .build());
    }
}
