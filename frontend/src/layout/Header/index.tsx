// import packages, libraries
import Link from 'next/link';

// import hooks

// import containers, components
import UserMenu from './UserMenu';
import SearchBar from 'components/SearchBar';
import GNB from './GNB';

// import styles, etc
import styles from './styles.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <UserMenu />
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>WONDER</a>
                    </Link>
                </div>
                <SearchBar width="300px" height="40px" />
            </div>
            <GNB />
        </header>
    );
};

export default Header;
