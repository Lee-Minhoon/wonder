import axios from "axios";
import Input from "components/common/Input";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useInput from "hooks/useInput";

export default function Login() {
    const id = useInput("");
    const password = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id.value);
        console.log(password.value);
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>LOGIN</h1>
                </header>
                <div>
                    <input type="text" placeholder="아이디" {...id} />
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
}
