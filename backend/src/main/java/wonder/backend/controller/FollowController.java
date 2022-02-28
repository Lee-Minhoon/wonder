package wonder.backend.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.common.Utilities;
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

@RestController
@AllArgsConstructor
public class FollowController {
    private final Logger logger = LoggerFactory.getLogger(FollowController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final FollowService followService;
    private final Utilities utilities;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("follow/{id}")
    public ResponseEntity createFollow(
            HttpServletRequest request,
            @PathVariable("id") Long followeeId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to create follow : {}, Requested user : {}", followeeId, loginUserId);

        User follower = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        User followee = utilities.getOrElseThrow(userService.getUserById(followeeId));
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

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.CREATE_FOLLOW)
                .message(ResponseMessage.CREATE_FOLLOW)
                .build());
    }

    @DeleteMapping("follow/{id}")
    public ResponseEntity deleteFollow(
            HttpServletRequest request,
            @PathVariable("id") Long followeeId
    ) {
        Long loginUserId = getLoginUserId(request.getHeader(AUTHORIZATION_HEADER));
        logger.info("Request to delete follow : {}, Requested user : {}", followeeId, loginUserId);

        User follower = utilities.getOrElseThrow(userService.getUserById(loginUserId));
        User followee = utilities.getOrElseThrow(userService.getUserById(followeeId));
        FollowId followId = FollowId.builder()
                .followerId(follower.getId())
                .followeeId(followee.getId())
                .build();
        Follow follow = utilities.getOrElseThrow(followService.getFollowById(followId));
        followService.deleteFollow(follow, follower);

        return ResponseEntity.ok().body(Response.builder()
                .code(ResponseCode.DELETE_FOLLOW)
                .message(ResponseMessage.DELETE_FOLLOW)
                .build());
    }

    public Long getLoginUserId(String header) {
        return header != null ? tokenProvider.getUserId(header.substring(7)) : 0;
    }
}
