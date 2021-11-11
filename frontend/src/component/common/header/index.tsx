import Util from './util';
import Logo from './logo';
import Search from './search';
import Gnb from './gnb';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <Util />
            <div className={styles.container}>
                <Logo />
                <Search />
            </div>
            <Gnb />
        </header>
    )
}