import axios from 'axios';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Input from 'components/common/Input';
import { useRouter } from 'next/router';

export default function Signup() {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [check, setCheck] = useState(null);
    const [nickname, setNickname] = useState(null);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, null, {
                params: {
                    id: id, password: password, nickname: nickname
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
        if (!id || !password || !nickname) {
            alert("빈 칸이 있습니다.");
            return false;
        }
        else if (password.length < 8) {
            alert("비밀번호를 8자 이상 입력하세요.");
            return false;
        }
        else if (password != check) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true;
    }

    return (
        <div className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>SIGNUP</h1>
                </header>
                <label>아이디</label>
                <div>
                    <Input type="text" name="id" setState={setId} />
                </div>
                <label>비밀번호</label>
                <div>
                    <Input type="password" name="password" setState={setPassword} />
                </div>
                <label>비밀번호 확인</label>
                <div>
                    <Input type="check" name="check" setState={setCheck} />
                </div>
                <label>닉네임</label>
                <div>
                    <Input type="text" name="nickname" setState={setNickname} />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
