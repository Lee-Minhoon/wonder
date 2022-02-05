// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// import utilities
import useLogin, { loginInput } from 'hooks/auth/useLogin';
import useInput from 'hooks/useInput';

// import components

// import etc
import styles from './styles.module.scss';

const Login = () => {
    const router = useRouter();
    const login = useLogin();
    const email = useInput('');
    const password = useInput('');
    const dispatch = useDispatch();

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
        console.log('로그인 시도 중..');
    }
    if (login.isError) {
        console.log('에러 발생');
    }
    if (login.isSuccess) {
        console.log('로그인 성공');
        router.push(router.query?.redirect.toString());
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
