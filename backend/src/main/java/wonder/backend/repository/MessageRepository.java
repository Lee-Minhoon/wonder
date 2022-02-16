package wonder.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.Message;
import wonder.backend.dto.mapper.MessageMapper;

import java.util.List;
import java.util.Optional;


public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(value = "SELECT m.id, m.title, m.content, sender.id as senderId, sender.nickname as sender, " +
            "recipient.id as recipientId, recipient.nickname as recipient, " +
            "m.sent_at as sentAt, m.received_at as receivedAt " +
            "FROM message as m " +
            "LEFT JOIN user as sender " +
            "ON m.sender_id = sender.id " +
            "LEFT JOIN user as recipient " +
            "ON m.recipient_id = recipient.id " +
            "WHERE m.id = :id ",
            countQuery = "SELECT * FROM message as m  " +
                    "WHERE m.id = :id",
            nativeQuery = true)
    Optional<MessageMapper.ReadMessageMapper> findMessageInfoById(Long id);

    @Query(value = "SELECT m.id, m.title, u.id as senderId, u.nickname as sender, " +
            "m.sent_at as sentAt, m.received_at as receivedAt " +
            "FROM message as m " +
            "LEFT JOIN user as u " +
            "ON m.sender_id = u.id " +
            "WHERE m.recipient_id = :recipientId " +
            "AND recipient_delete_status = 0 " +
            "ORDER BY sentAt DESC",
            countQuery = "SELECT * FROM message as m  " +
                    "WHERE m.recipient_id = :recipientId " +
                    "AND recipient_delete_status = 0",
            nativeQuery = true)
    Page<MessageMapper.ReadAllReceivedMessagesMapper> findAllReceivedMessageById(Long recipientId, Pageable pageable);

    @Query(value = "SELECT m.id, m.title, u.id as recipientId, u.nickname as recipient, " +
            "m.sent_at as sentAt, m.received_at as receivedAt " +
            "FROM message as m " +
            "LEFT JOIN user as u " +
            "ON m.recipient_id = u.id " +
            "WHERE m.sender_id = :senderId " +
            "AND sender_delete_status = 0 " +
            "ORDER BY sentAt DESC",
            countQuery = "SELECT * FROM message as m  " +
                    "WHERE m.sender_id = :senderId " +
                    "AND sender_delete_status = 0",
            nativeQuery = true)
    Page<MessageMapper.ReadAllSentMessagesMapper> findAllSentMessageById(Long senderId, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE message as m " +
            "SET m.recipient_delete_status = 1 " +
            "WHERE m.id in :messages",
            nativeQuery = true)
    void deleteReceivedMessagesByIdIn(List<Long> messages);

    @Transactional
    @Modifying
    @Query(value = "UPDATE message as m " +
            "SET m.sender_delete_status = 1 " +
            "WHERE m.id in :messages",
            nativeQuery = true)
    void deleteSentMessagesByIdIn(List<Long> messages);
}