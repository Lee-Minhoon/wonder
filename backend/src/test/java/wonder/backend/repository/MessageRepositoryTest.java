package wonder.backend.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigFileApplicationListener;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.domain.Message;
import wonder.backend.domain.User;
import wonder.backend.exception.CustomException;

import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MessageRepositoryTest {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EntityManager em;

    @Test
    void messageTest() {
        // User user1 = userRepository.findById(1L).orElseThrow(RuntimeException::new);
        // User user2 = userRepository.findById(2L).orElseThrow(RuntimeException::new);

        User user1 = User.builder()
                .email("popawaw@naver.com")
                .nickname("gasd f")
                .password("1234")
                .build();

        User user2 = User.builder().email("popawaw22222222@naver.com")
                .nickname("gasdf222222222222")
                .password("1234222222222222222222")
                .build();

        userRepository.save(user1);
        userRepository.save(user2);


        // Message message = Message.builder()".title("test1").content("테스트 입니다.").build();
        Message message = new Message("test", "content");
        user1.addSentMessage(message);
        user2.addReceivedMessage(message);

        messageRepository.save(message);

//        Set<Message> sentMessages = user1.getSentMessages();
//        List<Message> arr = new ArrayList<>(sentMessages);
//
//        String content = arr.get(0).getContent();
//        System.out.println(content);
//        Assertions.assertThat(content).isEqualTo("테스트 입니다.");
//
//        userRepository.save(user1);
//
//        List<Message> all = messageRepository.findAll();
//        Assertions.assertThat(all.size()).isEqualTo(1);

//        System.out.println("user1.getReceivedMessages() = " + user1.getReceivedMessages());
//        System.out.println("user2.getSentMessages() = " + user2.getSentMessages());
//        System.out.println("user2.getReceivedMessages() = " + user2.getReceivedMessages());
    }

    <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}