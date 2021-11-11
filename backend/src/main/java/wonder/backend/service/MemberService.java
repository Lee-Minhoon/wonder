<<<<<<< HEAD
package wonder.backend.service;

import wonder.backend.domain.Member;
import wonder.backend.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /** 회원 가입 **/
    public Long join(Member member) {
        validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member);
        return member.getNumber();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /** 전체 회원 조회 **/
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
=======
package wonder.backend.service;public class MemberService {
<<<<<<< HEAD
>>>>>>> fc35de2 (게시판 수정 및 redux 설정중..)
=======
>>>>>>> fc35de2f44e4e25b1b932768c7c1ad233ae84a1c
>>>>>>> 6b9ed98aaaa6c6ab375ebef65ee47e470f77acee
}
