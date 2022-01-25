// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import utilities
import useLogin from 'hooks/auth/useLogin';
import useInput from 'hooks/useInput';

// import components

// import etc
import styles from './styles.module.scss';

export interface loginInput {
    email: any;
    password: any;
}

const Login = () => {
    const router = useRouter();
    const email = useInput('');
    const password = useInput('');
    const login = useLogin();

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const loginInputValue: loginInput = {
                email: email.value,
                password: password.value,
            };
            login.mutate(loginInputValue);
        },
        [email.value, login, password.value]
    );

    if (login.isLoading) {
        console.log('로그인 시도중');
    }
    if (login.isError) {
        console.log('에러 발생');
    }
    if (login.isSuccess) {
        router.push('/');
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>LOGIN</h1>
                </header>
                <div>
                    <input type="text" placeholder="아이디" {...email} />
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" {...password} />
                </div>
                <button type="submit">로그인</button>
                <footer>
                    <a>아이디 찾기</a>
                    <a>비밀번호 찾기</a>
                </footer>
            </form>
        </div>
    );
};

export default Login;
