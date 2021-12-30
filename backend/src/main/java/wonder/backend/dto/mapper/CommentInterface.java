package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface CommentInterface {
    Long getId();
    String getContent();
    String getWriter();
    Timestamp getCreateDate();
}
