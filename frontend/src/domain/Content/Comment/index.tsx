// import components
import CommentList from './CommentList';

// import styles
import styles from '../styles.module.scss';

const Comment = () => {
    return (
        <section className={styles.comment}>
            <header>몇개의 댓글 등록순</header>
            <CommentList />
            <form>
                <div>
                    <input type="text"></input>
                    <button type="submit">＠</button>
                </div>
            </form>
        </section>
    );
};

export default Comment;
