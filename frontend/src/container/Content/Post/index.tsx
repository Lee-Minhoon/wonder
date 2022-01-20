// import components

import Link from 'next/link';

// import styles
import styles from '../styles.module.scss';

import { useRouter } from 'next/router';
import useReadPost from 'hooks/post/useReadPost';
import Span from 'components/Span/index';
import Blank from 'components/Blank';
import Emphasise from 'components/Emphasise';
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
    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(post.createDate));

    return (
        <article className={styles.content}>
            <header>
                <h2>{post.title}</h2>
                <div className={styles.info}>
                    <div>
                        <Link href={`/user/${post.writerId}`}>
                            <a>{post.writer}</a>
                        </Link>
                        <Blank />
                        <span>{date}</span>
                    </div>
                    <div>
                        <Span>
                            조회수 <Emphasise>{post.views}</Emphasise>
                        </Span>
                        <Blank />
                        <Span>
                            추천 <Emphasise>{post.likes}</Emphasise>
                        </Span>
                    </div>
                </div>
            </header>
            <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
};

export default Post;
