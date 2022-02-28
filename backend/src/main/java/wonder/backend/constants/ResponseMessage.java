package wonder.backend.constants;

public class ResponseMessage {
    public static final String BAD_REQUEST = "BAD_REQUEST";
    public static final String INVALID_ID = "INVALID_ID";
    public static final String INVALID_PASSWORD = "INVALID_PASSWORD";
    public static final String DUPLICATE = "DUPLICATE";
    public static final String NOT_FOUND = "NOT_FOUND";
    public static final String FORBIDDEN = "FORBIDDEN";
    public static final String UNAUTHORIZED = "UNAUTHORIZED";

    public static final String SUCCESS = "SUCCESS";

    public static final String SIGNUP_SUCCESS = "회원가입을 성공하였습니다.";
    public static final String LOGIN_SUCCESS = "로그인을 성공하였습니다.";

    public static final String READ_ME_SUCCESS = "내 정보를 성공적으로 읽어왔습니다.";
    public static final String READ_USER_SUCCESS = "유저 정보를 성공적으로 읽어왔습니다.";
    public static final String READ_FOLLOWERS_SUCCESS = "팔로워 정보를 성공적으로 읽어왔습니다.";
    public static final String READ_FOLLOWEES_SUCCESS = "팔로잉 정보를 성공적으로 읽어왔습니다.";
    public static final String UPDATE_ME_SUCCESS = "내 정보를 수정하였습니다.";

    public static final String CREATE_FOLLOW = "팔로우 하였습니다.";
    public static final String DELETE_FOLLOW = "팔로우를 취소하였습니다.";

    public static final String CREATE_POST = "게시글 작성을 성공하였습니다.";
    public static final String READ_POST = "게시글을 읽어왔습니다.";
    public static final String READ_POSTS_BY_CATEGORY = "게시글들을 읽어왔습니다.";
    public static final String READ_POSTS_BY_USER = "유저가 쓴 게시글들을 읽어왔습니다.";
    public static final String UPDATE_POST = "게시글을 수정하였습니다.";
    public static final String DELETE_POST = "게시글을 삭제하였습니다.";

    public static final String CREATE_COMMENT = "댓글입력을 성공하였습니다.";
    public static final String READ_COMMENTS = "댓글을 성공적으로 읽어왔습니다.";
    public static final String UPDATE_COMMENT = "댓글을 수정하였습니다.";
    public static final String DELETE_COMMENT = "댓글을 삭제하였습니다.";

    public static final String CREATE_RECOMMENDATION = "추천하였습니다.";

    public static final String CREATE_MESSAGE = "메시지를 작성하였습니다.";
    public static final String READ_MESSAGE = "메시지를 읽어왔습니다.";
    public static final String READ_RECEIVED_MESSAGES = "받은 메시지를 읽어왔습니다.";
    public static final String READ_SENT_MESSAGES = "보낸 메시지를 읽어왔습니다.";
    public static final String DELETE_RECEIVED_MESSAGES = "받은 메시지를 삭제하였습니다.";
    public static final String DELETE_SENT_MESSAGES = "보낸 메시지를 삭제하였습니다.";
}