package wonder.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wonder.backend.domain.Post;
import wonder.backend.dto.mapper.PostMapper;

import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT category.name as category, p.id, p.title, p.views, p.created_at as createdAt, " +
            "u.id as writerId, u.nickname as writer, u.profile_image_url as writerProfileImageUrl, " +
            "count(DISTINCT c.id) as countComments, count(DISTINCT r.post_id) as countRecs " +
            "FROM post as p " +
            "LEFT JOIN category " +
            "ON p.category_id = category.id " +
            "LEFT JOIN user as u " +
            "ON p.user_id = u.id " +
            "LEFT JOIN comment as c " +
            "ON p.id = c.post_id " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE ((:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
            "OR (:categoryId % 10 = 0 AND p.category_id < :categoryId + 10 AND p.category_id > :categoryId)) " +
            "AND p.title LIKE %:title% " +
            "GROUP BY p.id, p.title " +
            "ORDER BY p.id DESC",
            countQuery = "SELECT * FROM post as p " +
                    "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
                    "OR (:categoryId % 10 = 0 AND :categoryId + 10 > p.category_id AND p.category_id > :categoryId)" +
                    "AND p.title LIKE %:title%",
            nativeQuery = true)
    Page<PostMapper.ReadAllPostsMapper> findPostsByCategory(Long categoryId, String title, Pageable pageable);

    @Query(value = "SELECT category.name as category, p.id, p.title, p.views, p.created_at as createdAt, " +
            "u.id as writerId, u.nickname as writer, u.profile_image_url as writerProfileImageUrl, " +
            "count(DISTINCT c.id) as countComments, count(DISTINCT r.post_id) as countRecs " +
            "FROM post as p " +
            "LEFT JOIN category " +
            "ON p.category_id = category.id " +
            "LEFT JOIN user as u " +
            "ON p.user_id = u.id " +
            "LEFT JOIN comment as c " +
            "ON p.id = c.post_id " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE p.user_id = :userId " +
            "AND p.title LIKE %:title% " +
            "GROUP BY p.id, p.title " +
            "ORDER BY p.id DESC",
            countQuery = "SELECT * FROM post as p " +
                    "WHERE p.user_id = :userId " +
                    "AND p.title LIKE %:title%",
            nativeQuery = true)
    Page<PostMapper.ReadAllPostsMapper> findPostsByUser(Long userId, String title, Pageable pageable);

    @Query(value = "SELECT category.id as categoryId, p.id, p.title, p.content, p.views, p.created_at as createdAt, " +
            "u.id as writerId, u.nickname as writer, u.profile_image_url as writerProfileImageUrl, " +
            "count(DISTINCT r.post_id) as countRecs " +
            "FROM post as p " +
            "LEFT JOIN category " +
            "ON p.category_id = category.id " +
            "LEFT JOIN user as u " +
            "ON p.user_id = u.id " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE p.id = :id",
            nativeQuery = true)
    Optional<PostMapper.ReadPostMapper> findPostInfoById(Long id);

    @Query(value = "SELECT p.id, p.title, p.views, p.create_date as createDate, count(r.post_id) as countRecs " +
            "FROM post as p " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
            "OR (:categoryId % 10 = 0 AND p.category_id < :categoryId + 10 AND p.category_id > :categoryId) " +
            "GROUP BY p.id",
            countQuery = "SELECT * FROM post as p " +
                    "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
                    "OR (:categoryId % 10 = 0 AND :categoryId + 10 > p.category_id AND p.category_id > :categoryId)",
            nativeQuery = true)
    Page<PostMapper.ReadAllPostsMapper> findTest(Long categoryId, Pageable pageable);
}