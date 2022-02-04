// import package, library
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// import utilities
import useReadPost, { readPostInput } from 'hooks/post/useReadPost';

// import components
import Loading from 'components/Loading';
import PostUtil from './PostUtil';

// import etc
import styles from './styles.module.scss';

const Post = ({ setCategoryId, setUserId }) => {
    const router = useRouter();
    const readPostInputValue: readPostInput = {
        id: router.query.view,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadPost(readPostInputValue);

    if (isLoading) {
        return <Loading />;
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

    setCategoryId(post.categoryId);
    setUserId(post.writerId);

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.topArea}>
                    <h2>{post.title}</h2>
                    <PostUtil postId={post.id} />
                </div>
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
