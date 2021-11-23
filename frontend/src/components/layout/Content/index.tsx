import styles from "./styles.module.scss";
import Post from "./Post";
import Comment from "./Comment";
import BoardTitle from "components/atoms/BoardTitle";

export default function Content() {
    return (
        <section className={styles.view}>
            <header>
                <BoardTitle title="게시판" />
            </header>
            <Post />
            <Comment />
        </section>
    );
}
