package wonder.backend.dto.mapper;

import java.sql.Timestamp;

public class CommentMapper {
    public interface ReadAllCommentsMapper {
        Long getId();
        String getContent();
        String getWriter();
        Timestamp getCreatedAt();
    }
}