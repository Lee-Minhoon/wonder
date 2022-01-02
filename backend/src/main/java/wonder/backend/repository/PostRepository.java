package wonder.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wonder.backend.domain.Category;
import wonder.backend.domain.Post;
import wonder.backend.dto.mapper.PostInterface;

import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT c.name as category, p.id, p.title, p.views, p.create_date as createDate, u.id as writerId, u.nickname as writer, count(r.post_id) as likes " +
            "FROM post as p " +
            "LEFT JOIN category as c " +
            "ON p.category_id = c.id " +
            "LEFT JOIN user as u " +
            "ON p.user_id = u.id " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
            "OR (:categoryId % 10 = 0 AND p.category_id < :categoryId + 10 AND p.category_id > :categoryId) " +
            "GROUP BY p.id, p.title " +
            "ORDER BY p.id DESC",
            countQuery = "SELECT * FROM post as p " +
                    "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
                    "OR (:categoryId % 10 = 0 AND :categoryId + 10 > p.category_id AND p.category_id > :categoryId)",
            nativeQuery = true)
    Page<PostInterface> findAllPostByCategory(Long categoryId, Pageable pageable);

//    @Query(value = "SELECT p.id, p.title, p.views, p.create_date as createDate, count(r.post_id) as likes " +
//            "FROM post as p " +
//            "LEFT JOIN recommendation as r " +
//            "ON p.id = r.post_id " +
//            "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
//            "OR (:categoryId % 10 = 0 AND p.category_id < :categoryId + 10 AND p.category_id > :categoryId) " +
//            "GROUP BY p.id",
//            countQuery = "SELECT * FROM post as p " +
//                    "WHERE (:categoryId % 10 != 0 AND p.category_id = :categoryId) " +
//                    "OR (:categoryId % 10 = 0 AND :categoryId + 10 > p.category_id AND p.category_id > :categoryId)",
//            nativeQuery = true)
//    Page<PostInterface> findAllPostByCategory(Long categoryId, Pageable pageable);

    @Query(value = "SELECT p.id, p.title, p.content, p.views, p.create_date as createDate, u.id as writerId, u.nickname as writer, count(r.post_id) as likes " +
            "FROM post as p " +
            "LEFT JOIN user as u " +
            "ON p.user_id = u.id " +
            "LEFT JOIN recommendation as r " +
            "ON p.id = r.post_id " +
            "WHERE p.id = :id",
            nativeQuery = true)
    Optional<PostInterface> findPost(Long id);
}