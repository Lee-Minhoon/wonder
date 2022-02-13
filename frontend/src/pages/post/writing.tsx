import BoardLayout from 'layout/BoardLayout';
import PostWriting from 'container/PostWriting';

export const postWritingPagePath = '/post/writing';

const PostWritingPage = () => {
    return (
        <BoardLayout>
            <PostWriting />
        </BoardLayout>
    );
};

export default PostWritingPage;
