import Link from 'next/link';

// import styles
import styles from './styles.module.scss';

const UserUtil = () => {
    return (
        <nav className={styles.userUtil}>
            <ul>
                <li>
                    <Link href="/user/login">
                        <a>로그인</a>
                    </Link>
                </li>
                <li>
                    <Link href="/user/signup">
                        <a>회원가입</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default UserUtil;
