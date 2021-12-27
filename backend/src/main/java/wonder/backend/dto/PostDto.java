package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.Post;

@Getter
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private int recommend;

    @Builder
    public PostDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.recommend = post.getLikes();
    }
}
