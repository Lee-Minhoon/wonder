// import package, library
import Link from 'next/link';

// import utilities

// import components
import UserMenu from './UserMenu';
import SearchBar from 'components/SearchBar';
import GNB from './GNB';

// import etc
import styles from './styles.module.scss';
import { mainPagePath } from 'pages';

const Header = () => {
    return (
        <header className={styles.header}>
            <UserMenu />
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href={mainPagePath}>
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
