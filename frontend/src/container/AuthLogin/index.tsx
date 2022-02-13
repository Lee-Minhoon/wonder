// import package, library
import { useCallback } from 'react';

// import utilities
import useLogin, { loginInput } from 'hooks/auth/useLogin';
import useInput from 'hooks/useInput';

// import components
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const AuthLogin = () => {
    const login = useLogin();
    const email = useInput('');
    const password = useInput('');

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

    return (
        <>
            {login.isLoading && <Requesting />}
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
        </>
    );
};

export default AuthLogin;
