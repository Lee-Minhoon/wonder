import { useSelector } from "react-redux";
import Link from "next/link";
import category from "constants/category";
import styles from "./styles.module.scss";
import BoardTitle from "components/atoms/BoardTitle";

const LNB = () => {
    const loc = useSelector((state) => state.category.main);
    if (loc) {
        const main = category.find((item) => item.url === loc);
        const lnb = main.sub.map((item) => (
            <li key={item.id}>
                <Link href={{ pathname: "/board/list", query: { main: main.url, sub: item.url } }}>
                    <a>{item.title}</a>
                </Link>
            </li>
        ));

        return (
            <nav className={styles.lnb}>
                <BoardTitle title={main.title} url={main.url} />
                <ul>{lnb}</ul>
            </nav>
        );
    } else {
        return null;
    }
};

export default LNB;
