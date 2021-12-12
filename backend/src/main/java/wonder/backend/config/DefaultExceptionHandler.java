package wonder.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.WebUtils;
import wonder.backend.jwt.TokenProvider;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    @ExceptionHandler(value=Exception.class)
    public ResponseEntity<Map<String, String>> handle(Exception e, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> map = new HashMap<>();
        map.put("code", "400");
        logger.info("test");
        map.put("message", "non");
        return new ResponseEntity<>(map, headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
