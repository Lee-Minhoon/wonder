package wonder.backend.dto;

import lombok.Getter;

public class MessageDto {
    @Getter
    public static class CreateMessageDto {
        private String recipientNickname;
        private String title;
        private String content;
    }
}
