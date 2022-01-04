import { useRouter } from 'next/router';

// import service

// import hooks
import useInput from 'hooks/useInput';

// import styles
import styles from './styles.module.scss';
import { useCallback } from 'react';
import Link from 'next/link';
import useLogin from './../../hooks/auth/useLogin';

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

    // if (login.isLoading) {
    //     console.log('로그인 시도중');
    // }
    // if (login.isError) {
    //     console.log(login.error.response);
    // }
    // if (login.isSuccess) {
    //     console.log(login.data);
    //     router.push('/');
    // }

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
                <Link href={{ pathname: '/user/test' }}>
                    <a>test</a>
                </Link>
                <Link href={{ pathname: '/user/cookie' }}>
                    <a>test</a>
                </Link>
            </form>
        </div>
    );
};

export default Login;
