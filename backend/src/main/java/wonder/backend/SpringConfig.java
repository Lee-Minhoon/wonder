<<<<<<< HEAD
package wonder.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import wonder.backend.repository.JdbcTemplateMemberRepository;
import wonder.backend.repository.MemberRepository;
import wonder.backend.service.MemberService;

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
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }
    @Bean
    public MemberRepository memberRepository() {
        return new JdbcTemplateMemberRepository(dataSource);
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
=======
package wonder.backend;public class SpringConfig {
<<<<<<< HEAD
>>>>>>> fc35de2 (게시판 수정 및 redux 설정중..)
=======
>>>>>>> fc35de2f44e4e25b1b932768c7c1ad233ae84a1c
>>>>>>> 6b9ed98aaaa6c6ab375ebef65ee47e470f77acee
}
