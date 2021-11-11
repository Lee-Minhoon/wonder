import axios from 'axios';
import styles from './styles.module.scss';

export default function Signup() {
    return (
        <div className={styles.signup}>
            <form>
                <header>
                    <h1>SIGNUP</h1>
                </header>
                <label>아이디</label>
                <div>
                    <input type="text" />
                </div>
                <label>비밀번호</label>
                <div>
                    <input type="password" />
                </div>
                <label>비밀번호 확인</label>
                <div>
                    <input type="password" />
                </div>
                <label>이메일</label>
                <div>
                    <input type="email" />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
