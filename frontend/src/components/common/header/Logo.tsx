import Link from "next/link";
import styles from "./styles.module.scss";

export default function Logo() {
    return (
        <div className={styles.logo}>
            <Link href="/">
                <a>WONDER</a>
            </Link>
        </div>
    );
}
