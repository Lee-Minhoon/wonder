import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';
import category from 'constants/category';
import Emphasise from 'components/Emphasise';

const PostItem = (props) => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main.sub.find((item) => item.title === props.category);
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(props.createDate));

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
                <Emphasise> [{props.comments}]</Emphasise>
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
