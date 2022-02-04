// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useDeletePost, { deletePostInput } from 'hooks/post/useDeletePost';

// import components
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const PostUtil = ({ postId }: { postId: number }) => {
    const router = useRouter();
    const deletePost = useDeletePost();

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (confirm('삭제하시겠습니까?')) {
                const deletePostInputValue: deletePostInput = {
                    id: router.query?.view,
                };
                deletePost.mutate(deletePostInputValue);
                router.push(router.query.redirect.toString());
            } else {
                return;
            }
        },
        [router, deletePost]
    );

    return (
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
            <Button onClick={handleSubmit}>삭제</Button>
        </div>
    );
};

export default PostUtil;
