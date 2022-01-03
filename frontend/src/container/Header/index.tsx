// import components
import UserMenu from './UserMenu';
import Logo from './Logo';
import SearchBar from 'components/SearchBar';
import GNB from './GNB';

// import styles
import styles from './styles.module.scss';
import Link from 'next/link';

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
