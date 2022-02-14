// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadPost, { readPostInput } from 'hooks/post/useReadPost';
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';

// import components
import Button from 'components/Button';
import Comment from './Comment';
import Loading from 'components/Loading';
import Post from './Post';
import UserInfo from 'components/UserInfo';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const PostView = () => {
    const router = useRouter();
    const [mainCategoryTitle, setMainCategoryTitle] = useState<string>();
    const [subCategoryTitle, setSubCategoryTitle] = useState<string>();

    const readPostInputValue: readPostInput = {
        id: router.query?.id,
    };
    const {
        data: postData,
        error: postError,
        isLoading: postIsLoading,
        isSuccess: postIsSuccess,
        isError: postIsError,
    } = useReadPost(readPostInputValue);

    const readUserInputValue: readUserInput = {
        id: postData?.data?.writerId ? postData.data.writerId : 0,
    };
    const {
        data: userData,
        error: userError,
        isLoading: userIsLoading,
        isSuccess: userIsSuccess,
        isError: userIsError,
    } = useReadUser(readUserInputValue);

    useEffect(() => {
        if (postData && postData.data?.categoryId) {
            const temp = category.find((item) => item.id === Math.floor(postData.data?.categoryId / 10));
            setMainCategoryTitle(temp.title);
            setSubCategoryTitle(temp?.sub.find((item) => item.id === postData.data?.categoryId).title);
        }
    }, [postData]);

    return (
        <>
            {(postIsLoading || userIsLoading) && <Loading />}
            {postIsError && <p>{postError.response.data.message}</p>}
            {userIsError && <p>{userError.response.data.message}</p>}
            {postIsSuccess && userIsSuccess && (
                <div className={styles.content}>
                    <div className={styles.flexWrapper}>
                        <h1 className={styles.title}>
                            {mainCategoryTitle} – {subCategoryTitle}
                        </h1>
                        <div className={styles.buttonWrapper}>
                            <Button onClick={() => router.push(router.query.redirect.toString())}>목록으로</Button>
                        </div>
                    </div>
                    {postData && <Post post={postData?.data} />}
                    {userData && (
                        <div className={styles.userInfoWrapper}>
                            <UserInfo user={userData?.data} />
                        </div>
                    )}
                    <Comment />
                </div>
            )}
        </>
    );
};

export default PostView;
