<<<<<<< HEAD
package wonder.backend.repository;

import wonder.backend.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();
=======
package wonder.backend.repository;public interface MemberRepository {
<<<<<<< HEAD
>>>>>>> fc35de2 (게시판 수정 및 redux 설정중..)
=======
>>>>>>> fc35de2f44e4e25b1b932768c7c1ad233ae84a1c
>>>>>>> 6b9ed98aaaa6c6ab375ebef65ee47e470f77acee
}
