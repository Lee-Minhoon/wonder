package wonder.backend.dto.mapper;

import javax.persistence.Lob;
import java.sql.Clob;
import java.sql.NClob;
import java.sql.Timestamp;

public interface PostMapper {
    String getCategory();
    Long getId();
    String getTitle();
    Clob getContent();
    Long getWriterId();
    String getWriter();
    Timestamp getCreateDate();
    int getComments();
    int getViews();
    int getLikes();
}
