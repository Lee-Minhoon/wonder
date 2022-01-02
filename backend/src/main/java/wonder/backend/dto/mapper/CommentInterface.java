package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface CommentInterface {
    Long getId();
    String getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateDate();
}
