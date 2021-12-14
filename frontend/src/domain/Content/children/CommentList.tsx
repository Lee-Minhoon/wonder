// import components
import CommentItem from "./CommentItem";

// import styles
import styles from "../styles.module.scss";

const List = () => {
    return (
        <section className={styles.list}>
            <ul>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </ul>
        </section>
    );
};

export default List;
