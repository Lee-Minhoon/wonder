import { useSelector } from "react-redux";
import category from "constants/category";
import BoardTitle from "components/atoms/BoardTitle";
import Banner from "./Banner";
import PostList from "./PostList";
import Pagination from "./Pagination";
import SearchBar from "components/atoms/SearchBar";
import styles from "./styles.module.scss";
import PostUtil from "./PostUtil";

const Board = () => {
    const loc = useSelector((state) => state.category.main);
    if (loc) {
        const main = category.find((item) => item.url === loc);

        return (
            <section className={styles.board}>
                <header>
                    <BoardTitle title={main.title} url={main.url} />
                    <Banner />
                    <PostUtil />
                </header>
                <PostList />
                <footer className={styles.footer}>
                    <Pagination />
                    <SearchBar width="300px" height="30px" />
                </footer>
            </section>
        );
    } else {
        return null;
    }
};

export default Board;
