// import package, library
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// import utilities
import useReadPost from 'hooks/post/useReadPost';

// import components

// import etc
import styles from './styles.module.scss';

export interface readPostInput {
    id: any;
}

const Post = ({ setUser }) => {
    const router = useRouter();
    const readPostInputValue: readPostInput = {
        id: router.query.view,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadPost(readPostInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }

    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const post = data.data;
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(post.createdAt));
    setUser(post.writerId);

    return (
        <article className={styles.post}>
            <header>
                <h2>{post.title}</h2>
                <div className={styles.postInfo}>
                    <div className={styles.writerProfile}>
                        <Image src="/123.png" alt="writerProfile" layout="fill" />
                    </div>
                    <div className={styles.basicInfo}>
                        <Link href={{ pathname: `/user/${post.writerId}`, query: { page: 1, size: 20 } }}>
                            <a>{post.writer}</a>
                        </Link>
                        <p>{date}</p>
                    </div>
                    <div className={styles.etcInfo}>
                        <span>
                            조회수 <em>{post.views}</em>
                        </span>
                        <span>
                            추천 <em>{post.likes}</em>
                        </span>
                    </div>
                </div>
            </header>
            <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
};

export default Post;
