import axios from 'axios';
import styles from './styles.module.scss';

export default function Login() {
    return (
        <div className={styles.login}>
            <form>
                <header>
                    <h1>LOGIN</h1>
                </header>
                <div>
                    <input type="text" placeholder="아이디" />
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" />
                </div>
                <button type="submit">로그인</button>
                <footer>
                    <a>아이디 찾기</a>
                    <a>비밀번호 찾기</a>
                </footer>
            </form>
        </div>
    )
}
