package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public interface PostInterface {
    String getCategory();
    Long getId();
    String getTitle();
    String getContent();
    String getWriter();
    Timestamp getCreateDate();
    int getViews();
    int getLikes();
}
