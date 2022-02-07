// import package, library
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreateComment, { createCommentInput } from 'hooks/comment/useCreateComment';
import useReadAllComments, { readAllCommentsInput } from 'hooks/comment/useReadAllComments';
import useInput from 'hooks/useInput';

// import components
import CommentItem from './CommentItem';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import Requesting from 'components/Requesting';
import Loading from 'components/Loading';

const Comment = () => {
    const router = useRouter();
    const createComment = useCreateComment();
    const content = useInput('');

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const createCommentInputValue: createCommentInput = {
                postId: router.query.view,
                content: content.value.replace(/\n/g, '<br/>'),
            };
            createComment.mutate(createCommentInputValue);
        },
        [router.query.view, content.value, createComment]
    );

    const readAllCommentInputValue: readAllCommentsInput = {
        post: router.query.view,
        page: 0,
        size: 10,
    };
    const {
        data: commentsData,
        error: commentsError,
        isLoading: commentsIsLoading,
        isSuccess: commentsIsSuccess,
        isError: commentsIsError,
    } = useReadAllComments(readAllCommentInputValue);

    return (
        <>
            {createComment.isLoading && <Requesting />}
            {commentsIsLoading && <Loading />}
            {commentsIsError && <p>{commentsError.response.data.message}</p>}
            {commentsIsSuccess && (
                <section className={styles.comment}>
                    <header>{commentsData.data.count}개의 댓글 등록순</header>
                    <section className={styles.commentList}>
                        <ul>
                            {commentsData.data.data.map((item) => (
                                <CommentItem
                                    key={item.id}
                                    content={item.content}
                                    writer={item.writer}
                                    createdAt={item.createdAt}
                                />
                            ))}
                        </ul>
                    </section>
                    <form>
                        <div className={styles.inputBox}>
                            <textarea placeholder="댓글을 입력하세요." {...content} />
                        </div>
                        <div className={styles.buttonBox}>
                            <Button onClick={handleSubmit}>댓글 등록</Button>
                        </div>
                    </form>
                </section>
            )}
        </>
    );
};

export default Comment;
