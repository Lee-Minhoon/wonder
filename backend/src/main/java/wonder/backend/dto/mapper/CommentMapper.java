package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface CommentMapper {
    Long getId();
    String getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateDate();
}
