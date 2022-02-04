// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const PostItem = (props) => {
    const router = useRouter();
    const main = category.find((item) => item.sub.find((item) => item.title === props.category));
    const sub = main?.sub.find((item) => item.title === props.category);
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(props.createdAt));

    return (
        <tr className={styles.postItem}>
            <td>
                <Link
                    href={{
                        pathname: '/board/list',
                        query: { main: main?.url, sub: sub?.url, page: 1, size: 20 },
                    }}
                >
                    <a>{props.category}</a>
                </Link>
            </td>
            <td>{props.id}</td>
            <td>
                <Link
                    href={{
                        pathname: `/board/${props.id}`,
                        query: { redirect: router.asPath },
                    }}
                >
                    <a>{props.title}</a>
                </Link>
                {+props.comments !== 0 && <em> [{props.comments}]</em>}
            </td>
            <td>
                <div className={styles.profileData}>
                    <span className={styles.profileWrapper}>
                        <span className={styles.profile}>
                            <Image src="/123.png" alt="profile" layout="fill" />
                        </span>
                    </span>
                    <Link href={{ pathname: `/user/${props.writerId}`, query: { tabs: 'overview' } }}>
                        <a>{props.writer}</a>
                    </Link>
                </div>
            </td>
            <td>{date}</td>
            <td>{props.views}</td>
            <td>{props.likes}</td>
        </tr>
    );
};

export default PostItem;
