package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface PostMapper {
    String getCategory();
    Long getId();
    String getTitle();
    String getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateDate();
    int getComments();
    int getViews();
    int getLikes();
}
