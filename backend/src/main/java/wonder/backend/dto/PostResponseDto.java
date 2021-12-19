package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wonder.backend.domain.Post;

@Getter
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private int views;

    @Builder
    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
    }
}
