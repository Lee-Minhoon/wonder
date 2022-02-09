package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.PostMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;
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
        private Long categoryId;
        private Long id;
        private String title;
        private String content;
        private Long writerId;
        private String writer;
        private Timestamp createdAt;
        private int views;
        private int countRecs;

        @Builder
        public ReadPostDto(PostMapper.ReadPostMapper postMapper) {
            this.categoryId = postMapper.getCategoryId();
            this.id = postMapper.getId();
            this.title = postMapper.getTitle();
            this.content = clobToString(postMapper.getContent());
            this.writerId = postMapper.getWriterId();
            this.writer = postMapper.getWriter();
            this.createdAt = postMapper.getCreatedAt();
            this.views = postMapper.getViews();
            this.countRecs = postMapper.getCountRecs();
        }
    }

    @Getter
    public static class ReadAllPostsDto {
        private String category;
        private Long id;
        private String title;
        private Long writerId;
        private String writer;
        private Timestamp createdAt;
        private int views;
        private int countComments;
        private int countRecs;

        @Builder
        public ReadAllPostsDto(PostMapper.ReadAllPostsMapper postsMapper) {
            this.category = postsMapper.getCategory();
            this.id = postsMapper.getId();
            this.title = postsMapper.getTitle();
            this.writerId = postsMapper.getWriterId();
            this.writer = postsMapper.getWriter();
            this.createdAt = postsMapper.getCreatedAt();
            this.views = postsMapper.getViews();
            this.countComments = postsMapper.getCountComments();
            this.countRecs = postsMapper.getCountRecs();
        }
    }

    @Getter
    public static class UpdatePostDto {
        private String title;
        private String content;
    }

    public static String clobToString(Clob data) {
        StringBuilder sb = new StringBuilder();
        try {
            Reader reader = data.getCharacterStream();
            BufferedReader br = new BufferedReader(reader);

            String line;
            while (null != (line = br.readLine())) {
                sb.append(line);
            }
            br.close();
        } catch (SQLException e) {
            // handle this exception
        } catch (IOException e) {
            // handle this exception
        }
        return sb.toString();
    }
}
