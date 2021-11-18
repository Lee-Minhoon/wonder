package wonder.backend.common;

public class Response<T> {
    private String responseMessage;
    private T data;

    public Response(String responseMessage, T data) {
        this.responseMessage = responseMessage;
        this.data = data;
    }
}
