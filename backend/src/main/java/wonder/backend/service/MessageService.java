package wonder.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.domain.Message;
import wonder.backend.domain.User;
import wonder.backend.dto.MessageDto;
import wonder.backend.dto.common.ResponsePage;
import wonder.backend.dto.mapper.MessageMapper;
import wonder.backend.repository.MessageRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public MessageDto.ReadMessageDto readMessage(User reader, Message message, MessageMapper.ReadMessageMapper messageMapper) {
        readConfirm(reader, message);
        return MessageDto.ReadMessageDto.builder()
                .messageMapper(messageMapper)
                .build();
    }

    public void readConfirm(User reader, Message message) {
        if(reader.getId().equals(message.getRecipient().getId()) && message.getReceivedAt() == null) {
            message.setReceivedAt(new Timestamp(System.currentTimeMillis()));
        }
        return;
    }

    @Transactional(readOnly = true)
    public ResponsePage readReceivedMessages(User recipient, Pageable pageable) {
        Page<MessageMapper.ReadAllReceivedMessagesMapper> result = messageRepository.findReceivedMessages(recipient.getId(), pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(MessageDto.ReadReceivedMessagesDto::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public ResponsePage readSentMessages(User sender, Pageable pageable) {
        Page<MessageMapper.ReadAllSentMessagesMapper> result = messageRepository.findSentMessages(sender.getId(), pageable);
        return ResponsePage.builder()
                .pages(result.getTotalPages())
                .count(result.getTotalElements())
                .data(result.stream().map(MessageDto.ReadSentMessagesDto::new).collect(Collectors.toList()))
                .build();
    }

    public void deleteReceivedMessages(List<Long> messages) {
        messageRepository.deleteReceivedMessagesByIdIn(messages);
        return;
    }

    public void deleteSentMessages(List<Long> messages) {
        messageRepository.deleteSentMessagesByIdIn(messages);
        return;
    }

    public Optional<MessageMapper.ReadMessageMapper> getMessageInfoById(Long id) {
        return messageRepository.findMessageInfoById(id);
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }
}