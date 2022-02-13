package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.Message;
import wonder.backend.dto.mapper.MessageMapper;
import wonder.backend.dto.mapper.PostMapper;

import java.sql.Timestamp;

public class MessageDto {
    @Getter
    public static class CreateMessageDto {
        private String recipientNickname;
        private String title;
        private String content;
    }

    @Getter
    public static class ReadMessageDto {
        private Long id;
        private Long senderId;
        private String sender;
        private Long recipientId;
        private String recipient;
        private String title;
        private String content;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadMessageDto(MessageMapper.ReadMessageMapper messageMapper) {
            this.id = messageMapper.getId();
            this.senderId = messageMapper.getSenderId();
            this.sender = messageMapper.getSender();
            this.recipientId = messageMapper.getRecipientId();
            this.recipient = messageMapper.getRecipient();
            this.title = messageMapper.getTitle();
            this.content = messageMapper.getContent();
            this.sentAt = messageMapper.getSentAt();
            this.receivedAt = messageMapper.getReceivedAt();
        }
    }

    @Getter
    public static class ReadAllReceivedMessagesDto {
        private Long id;
        private String title;
        private Long senderId;
        private String sender;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadAllReceivedMessagesDto(MessageMapper.ReadAllReceivedMessagesMapper messagesMapper) {
            this.id = messagesMapper.getId();
            this.title = messagesMapper.getTitle();
            this.senderId = messagesMapper.getSenderId();
            this.sender = messagesMapper.getSender();
            this.sentAt = messagesMapper.getSentAt();
            this.receivedAt = messagesMapper.getReceivedAt();
        }
    }

    @Getter
    public static class ReadAllSentMessagesDto {
        private Long id;
        private String title;
        private Long recipientId;
        private String recipient;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadAllSentMessagesDto(MessageMapper.ReadAllSentMessagesMapper messagesMapper) {
            this.id = messagesMapper.getId();
            this.title = messagesMapper.getTitle();
            this.recipientId = messagesMapper.getRecipientId();
            this.recipient = messagesMapper.getRecipient();
            this.sentAt = messagesMapper.getSentAt();
            this.receivedAt = messagesMapper.getReceivedAt();
        }
    }
}
