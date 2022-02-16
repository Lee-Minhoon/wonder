// import package, library

// import utilities

// import components
import CommentItem from './CommentItem';

// import etc
import styles from './styles.module.scss';

const CommentList = ({ comments }) => {
    return (
        <ul className={styles.commentList}>
            {comments.map((item) => (
                <CommentItem
                    key={item.id}
                    content={item.content}
                    writer={item.writer}
                    writerProfileImageUrl={item.writerProfileImageUrl}
                    createdAt={item.createdAt}
                />
            ))}
        </ul>
    );
};

export default CommentList;
