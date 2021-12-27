import Link from 'next/link';

// import styles
import styles from './styles.module.scss';

const UserUtil = () => {
    return (
        <nav className={styles.userUtil}>
            <ul>
                <li>
                    <Link href="/auth/login">
                        <a>로그인</a>
                    </Link>
                </li>
                <li>
                    <Link href="/auth/signup">
                        <a>회원가입</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default UserUtil;
