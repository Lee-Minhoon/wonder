package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.dto.Response;
import wonder.backend.service.UserService;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @GetMapping
    public ResponseEntity signup(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        logger.info("Request to read all posts");

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readAllPost(page, size))
                        .build());
    }

    @GetMapping("{id}")
    public ResponseEntity login(
            @PathVariable("id") Long id
    ) {
        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .data(userService.readPost(id))
                        .build());
    }
}
