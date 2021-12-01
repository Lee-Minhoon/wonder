package wonder.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response<T> {
    private int statusCode;
    private String responseMessage;
    private T data;
}
