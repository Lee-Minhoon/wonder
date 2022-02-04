// import package, library
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreateComment, { createCommentInput } from 'hooks/comment/useCreateComment';
import useInput from 'hooks/useInput';

// import components
import CommentList from './CommentList';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const Comment = () => {
    const router = useRouter();
    const createComment = useCreateComment();
    const content = useInput('');
    const [commentCount, setCommentCount] = useState(0);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const createCommentInputValue: createCommentInput = {
                post: router.query.view,
                content: content.value.replace(/\n/g, '<br/>'),
            };
            createComment.mutate(createCommentInputValue);
        },
        [router.query.view, content.value, createComment]
    );

    if (createComment.isLoading) {
        console.log('댓글 입력 중..');
    }
    if (createComment.isError) {
        if (createComment.error.response.data.status == 401) {
            console.log('로그인 되지 않음');
            router.push('/auth/login');
        }
    }
    if (createComment.isSuccess) {
        console.log('댓글 입력 성공');
    }

    return (
        <section className={styles.comment}>
            <header>{commentCount}개의 댓글 등록순</header>
            <CommentList setCommentCount={setCommentCount} />
            <form>
                <div className={styles.inputBox}>
                    <textarea placeholder="댓글을 입력하세요." {...content} />
                </div>
                <div className={styles.buttonBox}>
                    <Button onClick={handleSubmit}>댓글 등록</Button>
                </div>
            </form>
        </section>
    );
};

export default Comment;
