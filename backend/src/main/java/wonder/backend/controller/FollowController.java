package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.domain.Follow;
import wonder.backend.domain.User;
import wonder.backend.domain.id.FollowId;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.FollowService;
import wonder.backend.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class FollowController {
    private final Logger logger = LoggerFactory.getLogger(FollowController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final FollowService followService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("follow/{id}")
    public ResponseEntity createFollow(
            HttpServletRequest request,
            @PathVariable("id") Long followeeId
    ) {
        logger.info("Request to create a follow");

        String jwt = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        User follower = getOrElseThrow(userService.getUserById(tokenProvider.getUserId(jwt)));
        User followee = getOrElseThrow(userService.getUserById(followeeId));
        System.out.println(follower.getId() + "-> follow plz ->" + followee.getId());
        if(follower.getId().equals(followee.getId())) {
            throw new CustomException(ExceptionEnum.BAD_REQUEST);
        }
        FollowId followId = FollowId.builder()
                .followerId(follower.getId())
                .followeeId(followee.getId())
                .build();
        Follow follow = Follow.builder()
                .followId(followId)
                .build();
        followService.createFollow(follow, follower, followee);

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
