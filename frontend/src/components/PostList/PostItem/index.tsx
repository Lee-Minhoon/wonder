// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// import utilities
import * as dateService from 'service/format';

// import components

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';
import { boardPagePath } from 'pages/board';
import { postViewPagePath } from 'pages/post/[id]';

const PostItem = (props) => {
    const router = useRouter();
    const main = category.find((item) => item.sub.find((item) => item.title === props.category));
    const sub = main?.sub.find((item) => item.title === props.category);

    const createdAt = dateService.isToday(new Date(props.createdAt))
        ? dateService.formatTime(new Date(props.createdAt))
        : dateService.formatDate(new Date(props.createdAt));

    return (
        <tr className={styles.postItem}>
            <td>
                <Link
                    href={{
                        pathname: `${boardPagePath}`,
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
                        pathname: `${postViewPagePath}/${props.id}`,
                        query: { redirect: router.asPath },
                    }}
                >
                    <a>{props.title}</a>
                </Link>
                {+props.comments !== 0 && <em> [{props.countComments}]</em>}
            </td>
            <td>
                <div className={styles.writerWrapper}>
                    <span className={styles.imageWrapper}>
                        <span className={styles.image}>
                            <Image
                                src={props.writerProfileImageUrl ? props.writerProfileImageUrl : '/defaultProfile.png'}
                                alt="profile"
                                layout="fill"
                            />
                        </span>
                    </span>
                    <Link href={{ pathname: `/user/${props.writerId}`, query: { tabs: 'overview' } }}>
                        <a>{props.writer}</a>
                    </Link>
                </div>
            </td>
            <td>{createdAt}</td>
            <td>{props.views}</td>
            <td>{props.countRecs}</td>
        </tr>
    );
};

export default PostItem;
