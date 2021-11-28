import { useRouter } from 'next/router';

// import service
import signup from 'service/signup';

// import hooks
import useInput from 'hooks/useInput';

// import styles
import styles from './styles.module.scss';
import React, { useCallback } from 'react';
import { report } from 'process';

export interface signupInput {
    id: any;
    password: any;
    check: any;
    nickname: any;
}

export default function Signup() {
    const router = useRouter();
    const id = useInput('');
    const password = useInput('');
    const check = useInput('');
    const nickname = useInput('');

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const signupInputValue: signupInput = {
                id: id.value,
                password: password.value,
                check: check.value,
                nickname: nickname.value,
            };
            const response = await signup(signupInputValue);
            console.log(response);
            if (response.statusCode === 200) {
                alert(response.data.nickname + '님 환영합니다.');
                router.push('/');
            } else if (response.statusCode === 409) {
                alert('아이디 중복입니다.');
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
                    <input type="password" {...password} />
                </div>
                <label>비밀번호 확인</label>
                <div>
                    <input type="password" {...check} />
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
