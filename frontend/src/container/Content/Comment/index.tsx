// import components
import CommentList from './CommentList';
import { useCallback } from 'react';
import useInput from 'hooks/useInput';

// import styles
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';
import createContent from 'service/comment/createContent';
import useReadAllComment from 'hooks/comment/useReadAllComment';

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

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const createCommentInputValue: createCommentInput = {
                post: router.query.view,
                content: content.value,
            };
            const response = await createContent(createCommentInputValue);
            if (response) {
                console.log(response);
                alert(response.message);
            }
        },
        [router, content]
    );

    const readAllCommentInputValue: readAllCommentInput = {
        post: router.query.view,
        page: 0,
        size: 10,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadAllComment(readAllCommentInputValue);

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
                <div>
                    <input type="text" placeholder="댓글을 입력하세요." {...content} />
                    <button type="submit">＠</button>
                </div>
            </form>
        </section>
    );
};

export default Comment;
