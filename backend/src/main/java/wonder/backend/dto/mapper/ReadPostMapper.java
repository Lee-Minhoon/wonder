package wonder.backend.dto.mapper;

import java.sql.Clob;
import java.sql.Timestamp;

public interface ReadPostMapper {
    Long getCategoryId();
    Long getId();
    String getTitle();
    Clob getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateAt();
    int getViews();
    int getLikes();
}
