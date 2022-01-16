package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.dto.mapper.PostMapper;

import javax.persistence.Column;
import javax.persistence.Lob;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.NClob;
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
        private String category;
        private Long id;
        private String title;
        private String content;
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
            this.content = clobToString(postMapper.getContent());
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
