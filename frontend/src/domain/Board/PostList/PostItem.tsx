import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';
import useCategory from 'hooks/useCategory';

const PostItem = () => {
    const category = useCategory();

    return (
        <tr className={styles.item}>
            <td>카테고리</td>
            <td>10000000</td>
            <td>
                <Link href={{ pathname: '/board/id', query: { main: category.main.url, sub: category.sub.url } }}>
                    <a>안녕하세요</a>
                </Link>
            </td>
            <td>
                <Link href="/user/test">
                    <a>이민훈</a>
                </Link>
            </td>
            <td>2021. 11. 09</td>
            <td>10000</td>
            <td>100</td>
        </tr>
    );
};

export default PostItem;
