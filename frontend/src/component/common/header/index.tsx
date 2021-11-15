import UserUtil from './UserUtil';
import Logo from './Logo';
import GlobalSearchBar from './GlobalSearchBar';
import GNB from './GNB';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <UserUtil />
            <div className={styles.container}>
                <Logo />
                <GlobalSearchBar />
            </div>
            <GNB />
        </header>
    )
}