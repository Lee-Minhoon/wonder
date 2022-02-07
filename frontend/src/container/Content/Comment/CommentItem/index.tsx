// import package, library
import Image from 'next/image';
import Link from 'next/link';

// import utilities

// import components

// import styles
import styles from './styles.module.scss';

const CommentItem = (props) => {
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(props.createdAt));

    return (
        <li className={styles.commentItem}>
            <div className={styles.commentInfo}>
                <div className={styles.writerProfile}>
                    <Image src="/123.png" alt="writerProfile" layout="fill" />
                </div>
                <div className={styles.basicInfo}>
                    <Link href={{ pathname: `/user/${props.writerId}`, query: { tabs: 'overview' } }}>
                        <a>{props.writer}</a>
                    </Link>
                    <p>{date}</p>
                </div>
            </div>
            <p dangerouslySetInnerHTML={{ __html: props.content }} />
        </li>
    );
};

export default CommentItem;
