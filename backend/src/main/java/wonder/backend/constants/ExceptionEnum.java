package wonder.backend.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;

@Getter @AllArgsConstructor
public enum ExceptionEnum {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST),
    DUPLICATE(HttpStatus.CONFLICT, ResponseCode.DUPLICATE, ResponseMessage.DUPLICATE),
    INVALID_ID(HttpStatus.FORBIDDEN, ResponseCode.INVALID_ID, ResponseMessage.INVALID_ID),
    INVALID_PASSWORD(HttpStatus.FORBIDDEN, ResponseCode.INVALID_PASSWORD, ResponseMessage.INVALID_PASSWORD),
    NOT_FOUND(HttpStatus.NOT_FOUND, ResponseCode.NOT_FOUND, ResponseMessage.NOT_FOUND),
    FORBIDDEN(HttpStatus.FORBIDDEN, ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, ResponseCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED);

    private final HttpStatus status;
    private final String code;
    private final String message;
}
