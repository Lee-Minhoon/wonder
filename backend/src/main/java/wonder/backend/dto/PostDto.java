package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.PostInterface;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
public class PostDto {
    private String category;
    private Long id;
    private String title;
    private String content;
    private String writer;
    private Timestamp createDate;
    private int views;
    private int likes;

    @Builder
    public PostDto(PostInterface postInterface) {
        this.category = postInterface.getCategory();
        this.id = postInterface.getId();
        this.title = postInterface.getTitle();
        this.content = postInterface.getContent();
        this.writer = postInterface.getWriter();
        this.createDate = postInterface.getCreateDate();
        this.views = postInterface.getViews();
        this.likes = postInterface.getLikes();
    }
}
