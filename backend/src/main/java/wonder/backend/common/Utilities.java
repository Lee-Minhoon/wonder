package wonder.backend.common;

import org.springframework.stereotype.Component;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.exception.CustomException;

import java.util.Optional;

@Component
public final class Utilities {
    public static <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
