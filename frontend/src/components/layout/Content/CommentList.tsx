import CommentItem from './CommentItem';
import styles from './styles.module.scss';

export default function List() {
    return (
        <section className={styles.list}>
            <ul>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </ul>
        </section>
    )
}
