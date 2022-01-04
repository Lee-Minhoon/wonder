import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// import constants
import category from 'constants/category';
import { useRouter } from 'next/router';

// import hooks
import useInput from 'hooks/useInput';
import useEditor from 'hooks/useEditor';

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Editor from './Editor';

// import styles
import styles from './styles.module.scss';
import useCreatePost from 'hooks/post/useCreatePost';

export interface createPostInput {
    category: any;
    title: any;
    content: any;
}

const Writing = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main.sub.find((item) => item.url === router.query.sub);
    const title = useInput('');
    const content = useEditor('');
    const createPost = useCreatePost();

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const createPostInputValue: createPostInput = {
                category: sub.id,
                title: title.value,
                content: content.value,
            };
            createPost.mutate(createPostInputValue);
        },
        [sub.id, title.value, content.value, createPost]
    );

    return (
        <div className={styles.writing}>
            <form onSubmit={handleSubmit}>
                <BoardTitle title={main.title} url={main.url} />
                <Divider />
                <input type="text" placeholder="제목을 입력하세요." {...title} />
                <Editor height="600px" initialEditType="wysiwyg" {...content} />
                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};

export default Writing;
