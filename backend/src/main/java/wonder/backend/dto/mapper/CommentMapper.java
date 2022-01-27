package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface CommentMapper {
    Long getId();
    String getContent();
    String getWriter();
    Timestamp getCreatedAt();
}
