package wonder.backend.dto.mapper;

import java.sql.Clob;
import java.sql.Timestamp;

public interface ReadAllPostsMapper {
    String getCategory();
    Long getId();
    String getTitle();
    Clob getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateAt();
    int getComments();
    int getViews();
    int getLikes();
}
