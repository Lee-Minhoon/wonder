// import package, library

// import utilities

// import components
import CommentItem from './CommentItem';

// import styles
import styles from './styles.module.scss';

const List = (props) => {
    return (
        <section className={styles.commentList}>
            <ul>
                {props.comments.map((item) => (
                    <CommentItem key={item.id} content={item.content} writer={item.writer} createdAt={item.createdAt} />
                ))}
            </ul>
        </section>
    );
};

export default List;
