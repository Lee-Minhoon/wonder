// import styles
import styles from "../styles.module.scss";

const PostSearchBar = () => {
    return (
        <div className={styles.search}>
            <input type="text" />
            <button type="submit">＠</button>
        </div>
    );
};

export default PostSearchBar;
