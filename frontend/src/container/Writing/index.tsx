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
import useCategory from 'hooks/useCategory';
import createPost from 'service/post/createPost';

export interface createPostInput {
    title: any;
    content: any;
}

const Writing = () => {
    const router = useRouter();

    const category = useCategory();
    const title = useInput('');
    const content = useEditor('');

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const createPostInputValue: createPostInput = {
                title: title.value,
                content: content.value,
            };
            const response = await createPost(createPostInputValue);
            if (response) {
                console.log(response);
                alert(response.message);
                router.push('/');
            }
        },
        [router, title, content]
    );

    return (
        <div className={styles.writing}>
            <form onSubmit={handleSubmit}>
                <BoardTitle title={category.main.title} url={category.main.url} />
                <Divider />
                <input type="text" placeholder="제목을 입력하세요." {...title} />
                <Editor height="600px" initialEditType="wysiwyg" {...content} />
                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};

export default Writing;
