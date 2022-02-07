// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadPost, { readPostInput } from 'hooks/post/useReadPost';

// import components
import Post from './Post';
import Comment from './Comment';
import UserInfo from 'components/UserInfo';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';
import { Loading } from 'components/Loading';

const Content = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(0);
    const [main, setMain] = useState<any>({});
    const [sub, setSub] = useState<any>({});

    const readPostInputValue: readPostInput = {
        id: router.query.view,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadPost(readPostInputValue);
    const post = data?.data;

    useEffect(() => {
        if (post && post?.categoryId) {
            const temp = category.find((item) => item.id === Math.floor(post?.categoryId / 10));
            setMain(temp);
            setSub(temp?.sub.find((item) => item.id === post?.categoryId));
        }
    }, [main?.sub, post]);

    return (
        <>
            {isLoading && <Loading />}
            {isError && <p>{error.response.data.message}</p>}
            {isSuccess && (
                <div className={styles.content}>
                    <div className={styles.topArea}>
                        <h1 className={styles.title}>
                            {main?.title} – {sub?.title}
                        </h1>
                        <div className={styles.topButtonArea}>
                            <Button onClick={() => router.push(router.query.redirect.toString())}>목록으로</Button>
                        </div>
                    </div>
                    {post && <Post post={post} />}
                    <div className={styles.userInfo}>
                        <UserInfo userId={userId} />
                    </div>
                    <Comment />
                </div>
            )}
        </>
    );
};

export default Content;
