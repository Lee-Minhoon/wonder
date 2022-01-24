// import package, library
import LinkList from 'components/LinkList';

// import utilities

// import components

// import etc
import styles from '../styles.module.scss';

const UserMenu = () => {
    return (
        <nav className={styles.userUtil}>
            <ul>
                <LinkList pathname={'/auth/login'} query={{}} text="로그인" />
                <LinkList pathname={'/auth/signup'} query={{}} text="회원가입" />
            </ul>
        </nav>
    );
};

export default UserMenu;
