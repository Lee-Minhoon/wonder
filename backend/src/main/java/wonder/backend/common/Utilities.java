package wonder.backend.common;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;

import java.util.Optional;

//@Component
//@RequiredArgsConstructor
public final class Utilities {
//    private final TokenProvider tokenProvider;

    protected Utilities() {};


    //자바, 디자인패턴, 상속, 추상화, 캡슐화,
    public static Utilities getUtilesClass() {
        return new Utilities();
    }
    
    public static <T> T getOrElseThrow(Optional<T> param) {
        // getBean 해보기
        // bean 등록하면 인스턴스.함수~
        // 스태틱은 클래스.함수 가능~

        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
