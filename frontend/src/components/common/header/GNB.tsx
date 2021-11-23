import Link from "next/link";
import styles from "./styles.module.scss";
import { category } from "constants/category";

const GNB = () => {
    return (
        <nav className={styles.gnb}>
            <ul>
                {category.map((item) => (
                    <li key={item.id}>
                        <Link href={{ pathname: "/board/list", query: { main: item.url, sub: "all" } }}>
                            <a>{item.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default GNB;
