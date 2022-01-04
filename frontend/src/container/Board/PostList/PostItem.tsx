import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';
import category from 'constants/category';

const PostItem = (props) => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main.sub.find((item) => item.url === router.query.sub);
    const date = new Date(props.createDate);

    return (
        <tr className={styles.item}>
            <td>
                <Link href={{ pathname: '/board/list', query: { ...router.query, sub: sub.url, page: 1, size: 20 } }}>
                    <a>{props.category}</a>
                </Link>
            </td>
            <td>{props.id}</td>
            <td>
                <Link href={{ pathname: `/board/${props.id}`, query: { ...router.query } }}>
                    <a>{props.title}</a>
                </Link>
            </td>
            <td>
                <Link href={`/user/${props.writerId}`}>
                    <a>{props.writer}</a>
                </Link>
            </td>
            <td>{date}</td>
            <td>{props.views}</td>
            <td>{props.likes}</td>
        </tr>
    );
};

export default PostItem;
