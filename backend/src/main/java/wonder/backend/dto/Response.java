package wonder.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class Response<T> {
    private String code;
    private String message;
    private T data;

    @Builder
    public Response(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
