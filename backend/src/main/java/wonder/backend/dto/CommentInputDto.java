package wonder.backend.dto;


import lombok.Getter;

@Getter
public class CommentInputDto {
    private Long post;
    private String content;
}
