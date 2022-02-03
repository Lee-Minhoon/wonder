// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllComment from 'hooks/comment/useReadAllComment';

// import components
import CommentItem from './CommentItem';
import Loading from 'components/Loading';

// import styles
import styles from './styles.module.scss';

const List = ({ setCommentCount }) => {
    const router = useRouter();

    const readAllCommentInputValue: readAllCommentInput = {
        post: router.query.view,
        page: 0,
        size: 10,
    };
    const { data, error, isLoading, isError } = useReadAllComment(readAllCommentInputValue);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const comments = data.data;
    setCommentCount(comments.count);

    return (
        <section className={styles.commentList}>
            <ul>
                {comments.data.map((item) => (
                    <CommentItem key={item.id} content={item.content} writer={item.writer} createdAt={item.createdAt} />
                ))}
            </ul>
        </section>
    );
};

export default List;
