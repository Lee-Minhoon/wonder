package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.PostMapper;

import java.sql.Timestamp;

public class PostDto {
    @Getter
    public static class CreatePostDto {
        private Long category;
        private String title;
        private String content;
    }

    @Getter
    public static class ReadPostDto {
        private String category;
        private Long id;
        private String title;
        private Long writerId;
        private String writer;
        private Timestamp createDate;
        private int views;
        private int likes;

        @Builder
        public ReadPostDto(PostMapper postMapper) {
            this.category = postMapper.getCategory();
            this.id = postMapper.getId();
            this.title = postMapper.getTitle();
            this.writerId = postMapper.getWriterId();
            this.writer = postMapper.getWriter();
            this.createDate = postMapper.getCreateDate();
            this.views = postMapper.getViews();
            this.likes = postMapper.getLikes();
        }
    }

    @Getter
    public static class ReadAllPostDto {
        private String category;
        private Long id;
        private String title;
        private String content;
        private Long writerId;
        private String writer;
        private Timestamp createDate;
        private int comments;
        private int views;
        private int likes;

        @Builder
        public ReadAllPostDto(PostMapper postMapper) {
            this.category = postMapper.getCategory();
            this.id = postMapper.getId();
            this.title = postMapper.getTitle();
            this.content = postMapper.getContent();
            this.writerId = postMapper.getWriterId();
            this.writer = postMapper.getWriter();
            this.createDate = postMapper.getCreateDate();
            this.comments = postMapper.getComments();
            this.views = postMapper.getViews();
            this.likes = postMapper.getLikes();
        }
    }

    @Getter
    public static class UpdatePostDto {
        private String title;
        private String content;
        private Timestamp updateDate;
    }
}
