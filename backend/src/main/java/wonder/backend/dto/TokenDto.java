package wonder.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class TokenDto {
    private Long id;
    private String token;
}