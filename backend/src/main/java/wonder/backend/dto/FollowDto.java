package wonder.backend.dto;

import lombok.Builder;
import lombok.Getter;
import wonder.backend.domain.Follow;
import wonder.backend.domain.User;

public class FollowDto {

    @Getter
    public static class readAllFollowersDto {
        private UserDto.ReadUserDto follower;

        @Builder
        public readAllFollowersDto(Follow follow) {
            this.follower = UserDto.ReadUserDto.builder()
                    .user(follow.getFollower())
                    .build();
        }
    }
}
