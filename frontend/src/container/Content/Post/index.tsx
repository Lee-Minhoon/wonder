// import components

import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';

import { useRouter } from 'next/router';
import useReadPost from 'hooks/post/useReadPost';
export interface readPostInput {
    id: any;
}

const Post = () => {
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

    return (
        <article className={styles.content}>
            <header>
                <h2>{post.title}</h2>
                <div className={styles.info}>
                    <div>
                        <Link href={`/user/${post.writerId}`}>
                            <a>{post.writer}</a>
                        </Link>
                        <p>{post.createDate}</p>
                    </div>
                    <div>
                        <p>{post.views}</p>
                        <p>{post.likes}</p>
                        <p>123</p>
                    </div>
                </div>
            </header>
            <article className={styles.article}>{post.content}</article>
        </article>
    );
};

export default Post;
