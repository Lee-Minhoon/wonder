import { useSelector } from "react-redux";
import category from "constants/category";
import styles from "./styles.module.scss";
import Post from "./Post";
import Comment from "./Comment";
import BoardTitle from "components/atoms/BoardTitle";

const Content = () => {
    const loc = useSelector((state) => state.category.main);
    if (loc) {
        const main = category.find((item) => item.url === loc);

        return (
            <section className={styles.view}>
                <header>
                    <BoardTitle title={main.title} url={main.url} />
                </header>
                <Post />
                <Comment />
            </section>
        );
    } else {
        return null;
    }
};

export default Content;
