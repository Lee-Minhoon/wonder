package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.CommentMapper;

import java.sql.Timestamp;

public class CommentDto {
    @Getter
    public static class CreateCommentDto {
        private Long post;
        private String content;
    }

    @Getter
    public static class ReadCommentDto {
        private Long id;
        private String content;
        private String writer;
        private Timestamp createdAt;

        @Builder
        public ReadCommentDto(CommentMapper commentMapper) {
            this.id = commentMapper.getId();
            this.content = commentMapper.getContent();
            this.writer = commentMapper.getWriter();
            this.createdAt = commentMapper.getCreatedAt();
        }
    }

    @Getter
    public static class UpdatePostDto {
        private String content;
        private Timestamp updateDate;
    }
}
