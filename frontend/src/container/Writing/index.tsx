// import package, library
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreatePost from 'hooks/post/useCreatePost';
import useInput from 'hooks/useInput';
import useEditor from 'hooks/useEditor';

// import components
import Divider from 'components/Divider';
import Editor from './Editor';
import SelectBox from 'components/SelectBox';
import ColoredHeading from 'components/ColoredHeading';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

export interface createPostInput {
    category: any;
    title: any;
    content: any;
}

const Writing = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);
    const [mainCategory, setMainCategory] = useState(main?.id);
    const [subCategory, setSubCategory] = useState(sub?.id);
    const title = useInput('');
    const content = useEditor('');
    const createPost = useCreatePost();

    console.log(typeof mainCategory, typeof subCategory);
    console.log(mainCategory, subCategory);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!mainCategory || !subCategory || mainCategory === 0 || subCategory % 10 === 0) {
                alert('카테고리가 선택되지 않았습니다.');
                return;
            }
            const createPostInputValue: createPostInput = {
                category: subCategory,
                title: title.value,
                content: content.value,
            };
            createPost.mutate(createPostInputValue);
        },
        [mainCategory, subCategory, title.value, content.value, createPost]
    );

    const mainOptions = category.map((item) => {
        return { id: item.id, value: item.id, text: item.title };
    });

    mainOptions.unshift({ id: 0, value: 0, text: '카테고리' });

    const subOptions = category
        .find((item) => item.id === mainCategory)
        ?.sub.map((item) => {
            if (item.id % 10 === 0) return { id: item.id, value: item.id, text: '카테고리' };
            return { id: item.id, value: item.id, text: item.title };
        });

    return (
        <div className={styles.writing}>
            <form onSubmit={handleSubmit}>
                <ColoredHeading>글쓰기</ColoredHeading>
                <Divider />
                <div>
                    <SelectBox
                        options={mainOptions}
                        onChange={(e) => setMainCategory(parseInt(e.target.value))}
                        selected={mainCategory}
                    />
                    <SelectBox
                        options={subOptions}
                        onChange={(e) => setSubCategory(parseInt(e.target.value))}
                        selected={subCategory}
                    />
                </div>
                <input type="text" placeholder="제목을 입력하세요." {...title} />
                <Editor height="600px" initialEditType="wysiwyg" {...content} />
                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};

export default Writing;
