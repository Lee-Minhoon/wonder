package wonder.backend.dto;


import lombok.Getter;

@Getter
public class PostInputDto {
    private Long category;
    private String title;
    private String content;
}
