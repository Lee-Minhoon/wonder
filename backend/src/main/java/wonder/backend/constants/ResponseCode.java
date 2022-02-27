package wonder.backend.constants;

public class ResponseCode {
    public static final String BAD_REQUEST = "BAD_REQUEST";
    public static final String INVALID_ID = "INVALID_ID";
    public static final String INVALID_PASSWORD = "INVALID_PASSWORD";
    public static final String DUPLICATE = "DUPLICATE";
    public static final String NOT_FOUND = "NOT_FOUND";
    public static final String FORBIDDEN = "FORBIDDEN";
    public static final String UNAUTHORIZED = "UNAUTHORIZED";

    public static final String SUCCESS = "SUCCESS";

    public static final String SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    public static final String LOGIN_SUCCESS = "LOGIN_SUCCESS";

    public static final String READ_ME_SUCCESS = "READ_ME_SUCCESS";
    public static final String READ_USER_SUCCESS = "READ_USER_SUCCESS";
    public static final String READ_FOLLOWERS_SUCCESS = "READ_FOLLOWERS_SUCCESS";
    public static final String READ_FOLLOWEES_SUCCESS = "READ_FOLLOWEES_SUCCESS";
    public static final String UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS";

    public static final String CREATE_FOLLWER = "CREATE_FOLLWER";
    public static final String DELETE_FOLLWER = "DELETE_FOLLWER";

    public static final String CREATE_POST = "CREATE_POST";
    public static final String READ_POST = "READ_POST";
    public static final String READ_POSTS_BY_CATEGORY = "READ_POSTS";
    public static final String READ_POSTS_BY_USER = "READ_POSTS_BY_USER";
    public static final String UPDATE_POST = "UPDATE_POST";
    public static final String DELETE_POST = "DELETE_POST";

    public static final String CREATE_COMMENT = "CREATE_COMMENT";
    public static final String READ_COMMENTS = "READ_COMMENTS";
    public static final String UPDATE_COMMENT = "UPDATE_COMMENT";
    public static final String DELETE_COMMENT = "DELETE_COMMENT";

    public static final String CREATE_RECOMMENDATION = "CREATE_RECOMMENDATION";

    public static final String CREATE_MESSAGE = "CREATE_MESSAGE";
    public static final String READ_MESSAGE = "READ_MESSAGE";
    public static final String READ_RECEIVED_MESSAGES = "READ_ECEIVED_MESSAGES";
    public static final String READ_SENT_MESSAGES = "READ_SENT_MESSAGES";
    public static final String DELETE_RECEIVED_MESSAGES = "DELETE_RECEIVED_MESSAGE";
    public static final String DELETE_SENT_MESSAGES = "DELETE_SENT_MESSAGE";
}
