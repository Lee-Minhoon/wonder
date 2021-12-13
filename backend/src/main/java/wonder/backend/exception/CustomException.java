package wonder.backend.exception;

import lombok.Getter;
import wonder.backend.constants.ExceptionEnum;

@Getter
public class CustomException extends RuntimeException {
    private ExceptionEnum error;

    public CustomException(ExceptionEnum e) {
        super(e.getMessage());
        this.error = e;
    }
}
