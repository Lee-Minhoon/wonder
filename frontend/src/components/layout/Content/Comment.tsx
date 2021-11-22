import styles from './styles.module.scss';
import CommentList from './CommentList';

export default function Comment() {
    return (
        <section className={styles.comment}>
            <header>
                몇개의 댓글
                등록순
            </header>
            <CommentList />
            <form>
                <div>
                    <input type="text"></input>
                    <button type="submit">＠</button>
                </div>
            </form>
        </section>
    )
}
