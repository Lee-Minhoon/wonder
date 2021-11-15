import Link from 'next/link';
import styles from './styles.module.scss';

export default function Util() {
    return (
        <nav className={styles.util}>
            <ul>
                <li>
                    <Link href="/user/login"><a>로그인</a></Link>
                </li>
                <li>
                    <Link href="/user/signup"><a>회원가입</a></Link>
                </li>
            </ul>
        </nav>
    )
}