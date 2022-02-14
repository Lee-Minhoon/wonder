// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useDeletePost, { deletePostInput } from 'hooks/post/useDeletePost';

// import components
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import Requesting from 'components/Requesting';

const PostUtil = ({ postId }: { postId: number }) => {
    const router = useRouter();
    const deletePost = useDeletePost();

    const handleDeleteClick = useCallback(
        (e) => {
            e.preventDefault();
            if (confirm('삭제하시겠습니까?')) {
                const deletePostInputValue: deletePostInput = {
                    id: router.query?.view,
                };
                deletePost.mutate(deletePostInputValue);
            } else {
                return;
            }
        },
        [router, deletePost]
    );

    return (
        <>
            {deletePost.isLoading && <Requesting />}
            <div className={styles.postUtil}>
                <Button
                    onClick={() =>
                        router.push({
                            pathname: '/board/write',
                            query: { redirect: router.query.redirect.toString(), update: postId },
                        })
                    }
                >
                    수정
                </Button>
                <Button onClick={handleDeleteClick}>삭제</Button>
            </div>
        </>
    );
};

export default PostUtil;
