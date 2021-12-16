package wonder.backend.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;

@Getter @AllArgsConstructor
public enum ExceptionEnum {
    ID_DUPLICATE(HttpStatus.CONFLICT, ResponseCode.ID_DUPLICATE, ResponseMessage.ID_DUPLICATE),
    INVALID_ID(HttpStatus.FORBIDDEN, ResponseCode.INVALID_ID, ResponseMessage.INVALID_ID),
    INVALID_PASSWORD(HttpStatus.FORBIDDEN, ResponseCode.INVALID_PASSWORD, ResponseMessage.INVALID_PASSWORD),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, ResponseCode.USER_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);

    private final HttpStatus status;
    private final String code;
    private final String message;
}
