package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.PostInterface;

import java.sql.Timestamp;

@Getter
public class PostDto {
    private String category;
    private Long id;
    private String title;
    private String content;
    private Long writerId;
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
        this.writerId = postInterface.getWriterId();
        this.writer = postInterface.getWriter();
        this.createDate = postInterface.getCreateDate();
        this.views = postInterface.getViews();
        this.likes = postInterface.getLikes();
    }
}
