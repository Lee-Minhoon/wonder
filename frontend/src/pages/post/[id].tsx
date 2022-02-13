import BoardLayout from 'layout/BoardLayout';
import PostView from 'container/PostView';

export const postViewPagePath = '/post';

const PostViewPage = () => {
    return (
        <BoardLayout>
            <PostView />
        </BoardLayout>
    );
};

export default PostViewPage;
