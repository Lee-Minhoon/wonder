import axios from 'axios';
import Input from 'component/common/Input';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(process.env.NEXT_PUBLIC_SERVER_URL);
        // console.log(id, password, nickname);
        // axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, null, {
        //     params: {
        //         id: id, password: password, nickname: nickname
        //     }
        // }).then(reponse => {
        //     alert(`${reponse.data.nickname}님 가입을 환영합니다.`);
        //     router.push('/');
        // });
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>LOGIN</h1>
                </header>
                <div>
                    <Input type="text" name="id" placeholder="아이디" setState={setId} />
                </div>
                <div>
                    <Input type="password" name="password" placeholder="비밀번호" setState={setPassword} />
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
