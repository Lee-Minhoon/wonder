import { useRouter } from 'next/router';

// import service

// import hooks
import useInput from 'hooks/useInput';

// import styles
import styles from './styles.module.scss';
import React, { useCallback } from 'react';
import useSignup from 'hooks/auth/useSignup';

export interface signupInput {
    email: any;
    password: any;
    check: any;
    nickname: any;
}

const Signup = () => {
    const router = useRouter();
    const email = useInput('');
    const password = useInput('');
    const check = useInput('');
    const nickname = useInput('');
    const signup = useSignup();

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const signupInputValue: signupInput = {
                email: email.value,
                password: password.value,
                check: check.value,
                nickname: nickname.value,
            };
            signup.mutate(signupInputValue);
        },
        [email.value, password.value, check.value, nickname.value, signup]
    );

    // if (signup.isLoading) {
    //     console.log('회원가입 시도중');
    // }
    // if (signup.isError) {
    //     console.log(signup.error.response);
    // }
    // if (signup.isSuccess) {
    //     console.log(signup.data);
    //     router.push('/');
    // }

    return (
        <div className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>SIGNUP</h1>
                </header>
                <label>아이디</label>
                <div>
                    <input type="text" {...email} />
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
};

export default Signup;
