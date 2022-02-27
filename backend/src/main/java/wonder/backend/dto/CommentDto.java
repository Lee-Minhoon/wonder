package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.CommentMapper;

import java.sql.Timestamp;

public class CommentDto {
    @Getter
    public static class CreateCommentDto {
        private Long postId;
        private String content;
    }

    @Getter
    public static class ReadCommentsDto {
        private Long id;
        private String content;
        private String writer;
        private String writerProfileImageUrl;
        private Timestamp createdAt;

        @Builder
        public ReadCommentsDto(CommentMapper.ReadAllCommentsMapper commentMapper) {
            this.id = commentMapper.getId();
            this.content = commentMapper.getContent();
            this.writer = commentMapper.getWriter();
            this.writerProfileImageUrl = commentMapper.getWriterProfileImageUrl();
            this.createdAt = commentMapper.getCreatedAt();
        }
    }

    @Getter
    public static class UpdatePostDto {
        private String content;
        private Timestamp updateDate;
    }
}
