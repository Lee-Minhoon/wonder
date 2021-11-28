import { useRouter } from "next/router";

// import service
import signup from "service/signup";

// import hooks
import useInput from "hooks/useInput";

// import styles
import styles from "./styles.module.scss";
import React, { useCallback } from "react";

export interface sigunInput {
    id: any;
    password: any;
    check: any;
    nickname: any;
}

export default function Signup() {
    const id = useInput("");
    const password = useInput("");
    const check = useInput("");
    const nickname = useInput("");
    const router = useRouter();

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 이부분이 로직이 좀 바뀌면 좋을거 같음
            // const signupInputValue = {
            //     id: id.value,
            //     password: password.value,
            //     check: check.value,
            //     nickname: nickname.value,
            // };
            // const response = await signup(signupInputValue);
            if (signup(id.value, password.value, check.value, nickname.value)) {
                router.push("/");
            }
        },
        [router, id, password, check, nickname]
    );

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
