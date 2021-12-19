import { useRouter } from 'next/router';

// import service
import login from 'service/auth/login';

// import hooks
import useInput from 'hooks/useInput';

// import styles
import styles from './styles.module.scss';
import { useCallback } from 'react';
import Link from 'next/link';

export interface loginInput {
    email: any;
    password: any;
}

const Login = () => {
    const router = useRouter();
    const email = useInput('');
    const password = useInput('');

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const loginInputValue: loginInput = {
                email: email.value,
                password: password.value,
            };
            const response = await login(loginInputValue);
            if (response) {
                console.log(response);
                alert(response.message);
                router.push('/');
            }
        },
        [router, email, password]
    );

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
