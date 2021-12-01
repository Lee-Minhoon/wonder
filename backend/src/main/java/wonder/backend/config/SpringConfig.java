package wonder.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import wonder.backend.repository.JdbcTemplateUserRepository;
import wonder.backend.repository.UserRepository;
import wonder.backend.service.UserService;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {
    //Jdbc Template
    private final DataSource dataSource;

    //Jdbc Template Constructor
    public SpringConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    //Jdbc Template Bean Registration
    @Bean
    public UserService memberService() {
        return new UserService(memberRepository());
    }
    @Bean
    public UserRepository memberRepository() {
        return new JdbcTemplateUserRepository(dataSource);
    }

//    //JPA
//    private final MemberRepository memberRepository;
//
//    //JPA Constructor
//    @Autowired
//    public SpringConfig(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }
//
//    //JPA Bean Registration
//    @Bean
//    public MemberService memberService() {
//        return new MemberService(memberRepository);
//    }

}
