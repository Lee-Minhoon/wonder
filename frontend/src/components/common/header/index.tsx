import UserUtil from "./UserUtil";
import Logo from "./Logo";
import SearchBar from "components/atoms/SearchBar";
import GNB from "./GNB";
import styles from "./styles.module.scss";

export default function Header() {
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
}
