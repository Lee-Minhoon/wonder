import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';
import useCategory from 'hooks/useCategory';

const PostItem = (props) => {
    const category = useCategory();

    return (
        <tr className={styles.item}>
            <td>{props.category}</td>
            <td>{props.id}</td>
            <td>
                <Link
                    href={{ pathname: `/board/${props.id}`, query: { main: category.main.url, sub: category.sub.url } }}
                >
                    <a>{props.title}</a>
                </Link>
            </td>
            <td>
                <Link href="/user/test">
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
