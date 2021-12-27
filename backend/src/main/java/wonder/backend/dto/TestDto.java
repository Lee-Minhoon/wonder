package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.Post;
import wonder.backend.domain.User;

@Getter
public class TestDto {
    private Long id;
    private int count;
}
