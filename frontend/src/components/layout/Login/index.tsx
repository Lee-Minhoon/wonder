import axios from 'axios';
import Input from 'components/common/Input';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, null, {
                params: {
                    id: id, password: password
                }
            }).then(reponse => {
                console.log(reponse);
                // alert(`${reponse.data.nickname}님 가입을 환영합니다.`);
                router.push('/');
            });
        } else {
            console.log('test');
        }
    }

    const validate = () => {
        if (password.length < 8) {
            alert("비밀번호를 8자 이상 입력하세요.");
            return false;
        }
        else {
            return true;
        }
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
