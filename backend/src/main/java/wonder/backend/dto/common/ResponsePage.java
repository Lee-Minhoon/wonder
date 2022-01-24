package wonder.backend.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ResponsePage<T> {
    private int pages;
    private Long count;
    private List<T> data;

    @Builder
    public ResponsePage(int pages, Long count, List<T> data) {
        this.pages = pages;
        this.count = count;
        this.data = data;
    }
}
