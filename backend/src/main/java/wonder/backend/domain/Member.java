<<<<<<< HEAD
package wonder.backend.domain;

import javax.persistence.*;

@Entity
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long number;
    private String id;
    private String password;

    @Column
    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
=======
package wonder.backend.domain;public class Member {
<<<<<<< HEAD
>>>>>>> fc35de2 (게시판 수정 및 redux 설정중..)
=======
>>>>>>> fc35de2f44e4e25b1b932768c7c1ad233ae84a1c
>>>>>>> 6b9ed98aaaa6c6ab375ebef65ee47e470f77acee
}
