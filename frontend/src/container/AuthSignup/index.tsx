// import package, library
import { useCallback } from 'react';

// import utilities
import useSignup, { signupInput } from 'hooks/auth/useSignup';
import useInput from 'hooks/useInput';

// import components
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const AuthSignup = () => {
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

    return (
        <>
            {signup.isLoading && <Requesting />}
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
        </>
    );
};

export default AuthSignup;
