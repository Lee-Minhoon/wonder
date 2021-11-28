import { useSelector } from "react-redux";

// import constants
import category from "constants/category";

// import components
import BoardTitle from "components/atoms/BoardTitle";
import Post from "./children/Post";
import Comment from "./children/Comment";

// import styles
import styles from "./styles.module.scss";

const Content = () => {
    const loc = useSelector((state) => state.category!.main);
    const main = category.find((item) => item.url === loc);

    return (
        <>
            {main && (
                <div className={styles.view}>
                    <header>
                        <BoardTitle title={main.title} url={main.url} />
                    </header>
                    <Post />
                    <Comment />
                </div>
            )}
        </>
    );
};

export default Content;
