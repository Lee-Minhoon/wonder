package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Message;
import wonder.backend.domain.User;
import wonder.backend.dto.MessageDto;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.MessageService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class MessageController {
    private final Logger logger = LoggerFactory.getLogger(MessageController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final MessageService messageService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("message")
    public ResponseEntity createMessage(
            HttpServletRequest request,
            @RequestBody MessageDto.CreateMessageDto createMessageDto
    ) {
        logger.info("Request to create a message");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User sender = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        User recipient = getOrElseThrow(userService.getUserByNickname(createMessageDto.getRecipientNickname()));
        if(sender.getId().equals(recipient.getId())) {
            throw new CustomException(ExceptionEnum.BAD_REQUEST);
        }
        Message message = Message.builder()
                .title(createMessageDto.getTitle())
                .content(createMessageDto.getContent())
                .build();
        messageService.createMessage(message, sender, recipient);

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }

//    @GetMapping("users/{id}/getFollowers")
//    public ResponseEntity getFollowers(
//            @PathVariable("id") Long followeeId,
//            @RequestParam("page") int page,
//            @RequestParam("size") int size
//    ) {
//        logger.info("Request to read all followers by user");
//
//        User followee = getOrElseThrow(userService.getUserById(followeeId));
//
//        followService.getFollowers(followee);
//
//        return ResponseEntity.ok()
//                .body(Response.builder()
//                        .code(ResponseCode.SUCCESS)
//                        .message(ResponseMessage.SUCCESS)
//                        .build());
//    }

    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
