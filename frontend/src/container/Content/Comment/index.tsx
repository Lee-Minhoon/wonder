// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllComment from 'hooks/comment/useReadAllComment';
import useCreateComment from 'hooks/comment/useCreateComment';
import useInput from 'hooks/useInput';

// import components
import CommentList from './CommentList';
import Button from 'components/Button';

// import etc
import styles from '../styles.module.scss';

export interface createCommentInput {
    post: any;
    content: any;
}

export interface readAllCommentInput {
    post: any;
    page: any;
    size: any;
}

const Comment = () => {
    const content = useInput('');
    const router = useRouter();
    const createComment = useCreateComment();

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const createCommentInputValue: createCommentInput = {
                post: router.query.view,
                content: content.value,
            };
            createComment.mutate(createCommentInputValue);
        },
        [router.query.view, content.value, createComment]
    );

    const readAllCommentInputValue: readAllCommentInput = {
        post: router.query.view,
        page: 0,
        size: 10,
    };
    const { data, error, isLoading, isError } = useReadAllComment(readAllCommentInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }

    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const comments = data.data;

    return (
        <section className={styles.comment}>
            <header>{comments.count}개의 댓글 등록순</header>
            <CommentList comments={comments.data} />
            <form onSubmit={handleSubmit}>
                <div className={styles.inputBox}>
                    <input type="text" placeholder="댓글을 입력하세요." {...content} />
                </div>
                <div className={styles.button}>
                    <Button onClick={handleSubmit}>댓글 등록</Button>
                </div>
            </form>
        </section>
    );
};

export default Comment;
