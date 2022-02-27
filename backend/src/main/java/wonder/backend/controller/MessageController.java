package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.common.Utilities;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Message;
import wonder.backend.domain.User;
import wonder.backend.dto.MessageDto;
import wonder.backend.dto.common.Response;
import wonder.backend.dto.mapper.MessageMapper;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.MessageService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class MessageController {
    private final Logger logger = LoggerFactory.getLogger(MessageController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final MessageService messageService;
    private final Utilities utilities;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("messages")
    public ResponseEntity createMessage(
            HttpServletRequest request,
            @RequestBody MessageDto.CreateMessageDto createMessageDto
    ) {
        logger.info("Request to create a message");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User sender = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        User recipient = utilities.getOrElseThrow(userService.getUserByNickname(createMessageDto.getRecipientNickname()));
        if(sender.getId().equals(recipient.getId())) {
            throw new CustomException(ExceptionEnum.BAD_REQUEST);
        }
        Message message = Message.builder()
                .title(createMessageDto.getTitle())
                .content(createMessageDto.getContent())
                .build();
        messageService.createMessage(message, sender, recipient);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.CREATE_MESSAGE)
                .message(ResponseMessage.CREATE_MESSAGE)
                .build());
    }

    @GetMapping("messages/{id}")
    public ResponseEntity readMessage(
            HttpServletRequest request,
            @PathVariable("id") Long messageId
    ) {
        logger.info("Request to read a message : {}", messageId);

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User reader = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Message message = utilities.getOrElseThrow(messageService.getMessageById(messageId));
        MessageMapper.ReadMessageMapper messageMapper = utilities.getOrElseThrow(messageService.getMessageInfoById(messageId));

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_MESSAGE)
                .message(ResponseMessage.READ_MESSAGE)
                .data(messageService.readMessage(reader, message, messageMapper))
                .build());
    }

    @GetMapping("receivedMessages")
    public ResponseEntity readReceivedMessages(
            HttpServletRequest request,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all received messages");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User recipient = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_RECEIVED_MESSAGES)
                .message(ResponseMessage.READ_RECEIVED_MESSAGES)
                .data(messageService.readReceivedMessages(recipient, pageable))
                .build());
    }

    @GetMapping("sentMessages")
    public ResponseEntity readSentMessages(
            HttpServletRequest request,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all received messages");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User sender = utilities.getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.READ_SENT_MESSAGES)
                .message(ResponseMessage.READ_SENT_MESSAGES)
                .data(messageService.readSentMessages(sender, pageable))
                .build());
    }

    @DeleteMapping("receivedMessages/{id}")
    public ResponseEntity deleteReceivedMessages(
            HttpServletRequest request,
            @PathVariable("id") String messagesId
    ) {
        String split[] = messagesId.split(",");
        List<Long> messages = Arrays.stream(split).map(message -> Long.parseLong(message)).collect(Collectors.toList());
        messageService.deleteReceivedMessages(messages);
        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_RECEIVED_MESSAGES)
                .message(ResponseMessage.DELETE_RECEIVED_MESSAGES)
                .build());
    }

    @DeleteMapping("sentMessages/{id}")
    public ResponseEntity deleteSentMessages(
            HttpServletRequest request,
            @PathVariable("id") String messagesId
    ) {
        String split[] = messagesId.split(",");
        List<Long> messages = Arrays.stream(split).map(message -> Long.parseLong(message)).collect(Collectors.toList());
        messageService.deleteSentMessages(messages);
        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_SENT_MESSAGES)
                .message(ResponseMessage.DELETE_SENT_MESSAGES)
                .build());
    }
}
