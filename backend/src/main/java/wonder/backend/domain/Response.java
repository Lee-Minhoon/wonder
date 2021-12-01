package wonder.backend.domain;

public class Response<T> {
    private int statusCode;
    private String responseMessage;
    private T data;

    public Response(int statusCode, String responseMessage, T data) {
        this.statusCode = statusCode;
        this.responseMessage = responseMessage;
        this.data = data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
