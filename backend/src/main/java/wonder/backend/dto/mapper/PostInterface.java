package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface PostInterface {
    String getCategory();
    Long getId();
    String getTitle();
    String getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateDate();
    int getViews();
    int getLikes();
}
