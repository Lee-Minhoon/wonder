// import components
import UserUtil from './UserUtil';
import Logo from './Logo';
import SearchBar from 'components/SearchBar/SearchBar';
import GNB from './GNB';

// import styles
import styles from './styles.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <UserUtil />
            <div className={styles.container}>
                <Logo />
                <SearchBar width="300px" height="40px" />
            </div>
            <GNB />
        </header>
    );
};

export default Header;
