package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.Message;
import wonder.backend.domain.User;
import wonder.backend.repository.MessageRepository;

import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class MessageService {
    private final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private final MessageRepository messageRepository;

    public void createMessage(Message message, User sender, User recipient) {
        sender.addSentMessage(message);
        recipient.addReceivedMessage(message);
        messageRepository.save(message);
        return;
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }
}