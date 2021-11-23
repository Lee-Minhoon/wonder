import BoardTitle from "components/atoms/BoardTitle";
import Banner from "./Banner";
import PostList from "./PostList";
import Pagination from "./Pagination";
import SearchBar from "components/atoms/SearchBar";
import styles from "./styles.module.scss";
import PostUtil from "./PostUtil";

export default function Board() {
    return (
        <section className={styles.board}>
            <header>
                <BoardTitle title="게시판" />
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
}
