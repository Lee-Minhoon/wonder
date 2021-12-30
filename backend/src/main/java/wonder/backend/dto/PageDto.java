package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PageDto<T> {
    private int pages;
    private Long count;
    private List<T> data;

    @Builder
    public PageDto(int pages, Long count, List<T> data) {
        this.pages = pages;
        this.count = count;
        this.data = data;
    }
}
