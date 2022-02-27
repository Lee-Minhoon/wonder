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
        private String senderProfileImageUrl;
        private Long recipientId;
        private String recipient;
        private String recipientProfileImageUrl;
        private String title;
        private String content;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadMessageDto(MessageMapper.ReadMessageMapper messageMapper) {
            this.id = messageMapper.getId();
            this.senderId = messageMapper.getSenderId();
            this.sender = messageMapper.getSender();
            this.senderProfileImageUrl = messageMapper.getSenderProfileImageUrl();
            this.recipientId = messageMapper.getRecipientId();
            this.recipient = messageMapper.getRecipient();
            this.recipientProfileImageUrl = messageMapper.getRecipientProfileImageUrl();
            this.title = messageMapper.getTitle();
            this.content = messageMapper.getContent();
            this.sentAt = messageMapper.getSentAt();
            this.receivedAt = messageMapper.getReceivedAt();
        }
    }

    @Getter
    public static class ReadReceivedMessagesDto {
        private Long id;
        private String title;
        private Long senderId;
        private String sender;
        private String senderProfileImageUrl;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadReceivedMessagesDto(MessageMapper.ReadAllReceivedMessagesMapper messagesMapper) {
            this.id = messagesMapper.getId();
            this.title = messagesMapper.getTitle();
            this.senderId = messagesMapper.getSenderId();
            this.sender = messagesMapper.getSender();
            this.senderProfileImageUrl = messagesMapper.getSenderProfileImageUrl();
            this.sentAt = messagesMapper.getSentAt();
            this.receivedAt = messagesMapper.getReceivedAt();
        }
    }

    @Getter
    public static class ReadSentMessagesDto {
        private Long id;
        private String title;
        private Long recipientId;
        private String recipient;
        private String recipientProfileImageUrl;
        private Timestamp sentAt;
        private Timestamp receivedAt;

        @Builder
        public ReadSentMessagesDto(MessageMapper.ReadAllSentMessagesMapper messagesMapper) {
            this.id = messagesMapper.getId();
            this.title = messagesMapper.getTitle();
            this.recipientId = messagesMapper.getRecipientId();
            this.recipient = messagesMapper.getRecipient();
            this.recipientProfileImageUrl = messagesMapper.getRecipientProfileImageUrl();
            this.sentAt = messagesMapper.getSentAt();
            this.receivedAt = messagesMapper.getReceivedAt();
        }
    }
}
