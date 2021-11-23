import styles from "./styles.module.scss";
import Link from "next/link";

export default function BoardTitle(props) {
    const title = props.title;

    return (
        <div className={styles.boardTitle}>
            <Link href="/board/list">
                <a>{title}</a>
            </Link>
        </div>
    );
}
