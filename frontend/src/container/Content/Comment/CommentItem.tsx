// import styles
import styles from '../styles.module.scss';

const CommentItem = (props) => {
    return (
        <li className={styles.item}>
            <div>{props.writer}</div>
            <div>{props.createDate}</div>
            <div>{props.content}</div>
        </li>
    );
};

export default CommentItem;
