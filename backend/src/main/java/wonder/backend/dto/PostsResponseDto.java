package wonder.backend.dto;

import lombok.Getter;
import wonder.backend.domain.Post;

@Getter
public class PostsResponseDto {
    private Long id;
    private String title;
    private String content;
    private int views;

    public PostsResponseDto(Post entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.views = entity.getViews();
    }
}
