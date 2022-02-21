package wonder.backend.dto.mapper;

import java.sql.Clob;
import java.sql.Timestamp;

public class MessageMapper {
    public interface ReadMessageMapper {
        Long getId();
        Long getSenderId();
        String getSender();
        String getSenderProfileImageUrl();
        Long getRecipientId();
        String getRecipient();
        String getRecipientProfileImageUrl();
        String getTitle();
        String getContent();
        Timestamp getSentAt();
        Timestamp getReceivedAt();
    }

    public interface ReadAllReceivedMessagesMapper {
        Long getId();
        Long getSenderId();
        String getSender();
        String getSenderProfileImageUrl();
        String getTitle();
        Timestamp getSentAt();
        Timestamp getReceivedAt();
    }

    public interface ReadAllSentMessagesMapper {
        Long getId();
        Long getRecipientId();
        String getRecipient();
        String getRecipientProfileImageUrl();
        String getTitle();
        Timestamp getSentAt();
        Timestamp getReceivedAt();
    }
}