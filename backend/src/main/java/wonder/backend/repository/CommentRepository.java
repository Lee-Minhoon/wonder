package wonder.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wonder.backend.domain.Comment;
import wonder.backend.dto.mapper.CommentMapper;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT c.id, c.content, c.created_at as createdAt, u.nickname as writer, " +
            "u.profile_image_url as writerProfileImageUrl " +
            "FROM comment as c " +
            "LEFT JOIN user as u " +
            "ON c.user_id = u.id " +
            "WHERE c.post_id = :postId " +
            "ORDER BY c.id DESC",
            countQuery = "SELECT * FROM comment as c " +
                    "WHERE c.post_id = :postId ",
            nativeQuery = true)
    Page<CommentMapper.ReadAllCommentsMapper> findComments(Long postId, Pageable pageable);
}