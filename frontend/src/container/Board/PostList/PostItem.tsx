import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';
import useCategory from 'hooks/useCategory';
import categor from 'constants/category';

const PostItem = (props) => {
    const category = useCategory();
    const sub = category.main.sub.find((item) => item.title === props.category);
    console.log(sub);

    return (
        <tr className={styles.item}>
            <td>
                <Link
                    href={{
                        pathname: '/board/list',
                        query: { main: category.main.url, sub: sub.url, page: 1, size: 20 },
                    }}
                >
                    <a>{props.category}</a>
                </Link>
            </td>
            <td>{props.id}</td>
            <td>
                <Link
                    href={{ pathname: `/board/${props.id}`, query: { main: category.main.url, sub: category.sub.url } }}
                >
                    <a>{props.title}</a>
                </Link>
            </td>
            <td>
                <Link href={`/user/${props.writerId}`}>
                    <a>{props.writer}</a>
                </Link>
            </td>
            <td>{props.createDate}</td>
            <td>{props.views}</td>
            <td>{props.likes}</td>
        </tr>
    );
};

export default PostItem;
