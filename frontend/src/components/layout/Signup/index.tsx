import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import useInput from "hooks/useInput";
import signup from "service/signup";

export default function Signup() {
    const id = useInput("");
    const password = useInput("");
    const check = useInput("");
    const nickname = useInput("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signup(id.value, password.value, check.value, nickname.value)) {
            router.push("/");
        }
    };

    return (
        <div className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>SIGNUP</h1>
                </header>
                <label>아이디</label>
                <div>
                    <input type="text" {...id} />
                </div>
                <label>비밀번호</label>
                <div>
                    <input type="text" {...password} />
                </div>
                <label>비밀번호 확인</label>
                <div>
                    <input type="text" {...check} />
                </div>
                <label>닉네임</label>
                <div>
                    <input type="text" {...nickname} />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
