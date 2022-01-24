// import package, library
import Link from 'next/link';

// import utilities

// import components
import Span from 'components/Span';

// import styles
import styles from '../../styles.module.scss';

const CommentItem = (props) => {
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(props.createDate));
    return (
        <li className={styles.item}>
            <Link href={`/user/${props.writerId}`}>
                <a>{props.writer}</a>
            </Link>
            <Span>{date}</Span>
            <p>{props.content}</p>
        </li>
    );
};

export default CommentItem;
