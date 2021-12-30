package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.CommentInterface;
import wonder.backend.dto.mapper.PostInterface;

import java.sql.Timestamp;

@Getter
public class CommentDto {
    private Long id;
    private String content;
    private String writer;
    private Timestamp createDate;

    @Builder
    public CommentDto(CommentInterface commentInterface) {
        this.id = commentInterface.getId();
        this.content = commentInterface.getContent();
        this.writer = commentInterface.getWriter();
        this.createDate = commentInterface.getCreateDate();
    }
}
