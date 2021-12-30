package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PostsDto {
    private int pages;
    private Long count;
    private List<PostDto> posts;

    @Builder
    public PostsDto(int pages, Long count, List<PostDto> posts) {
        this.pages = pages;
        this.count = count;
        this.posts = posts;
    }
}
