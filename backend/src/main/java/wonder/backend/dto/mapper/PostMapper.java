package wonder.backend.dto.mapper;

import java.sql.Clob;
import java.sql.Timestamp;

public class PostMapper {
    public interface ReadPostMapper {
        Long getCategoryId();
        Long getId();
        String getTitle();
        Clob getContent();
        Long getWriterId();
        String getWriter();
        Timestamp getCreatedAt();
        int getViews();
        int getCountRecs();
    }

    public interface ReadAllPostsMapper {
        String getCategory();
        Long getId();
        String getTitle();
        Clob getContent();
        Long getWriterId();
        String getWriter();
        Timestamp getCreatedAt();
        int getViews();
        int getCountComments();
        int getCountRecs();
    }
}
