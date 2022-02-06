// import package, library
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreatePost, { createPostInput } from 'hooks/post/useCreatePost';
import useReadPost, { readPostInput } from 'hooks/post/useReadPost';
import useInput from 'hooks/useInput';
import useEditor from 'hooks/useEditor';

// import components
import Editor from './Editor';
import SelectBox from 'components/SelectBox';
import Button from 'components/Button';
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Writing = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);
    const [mainCategory, setMainCategory] = useState(main?.id);
    const [subCategory, setSubCategory] = useState(sub?.id);
    const createPost = useCreatePost();
    const title = useInput('');
    const content = useEditor('');

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

    if (createPost.isLoading) {
        console.log('글 작성 중..');
    }
    if (createPost.isError) {
        if (createPost.error.response.data.status == 401) {
            console.log('로그인 되지 않음');
            router.push('/auth/login');
        }
    }
    if (createPost.isSuccess) {
        console.log('글 작성 성공');
        router.push({ pathname: `/board/${createPost.data.data}`, query: { redirect: router.query?.redirect } });
    }

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

    const readPostInputValue: readPostInput = {
        id: router.query?.update,
    };
    const { data, error, isLoading, isSuccess, isError, refetch } = useReadPost(readPostInputValue);
    if (router.query?.update) refetch();
    if (isLoading) return <Loading />;
    if (isError) <p>{error.response.data.message}</p>;
    const post = data.data;
    console.log(post);

    return (
        <div className={styles.writing}>
            <form>
                <h1>글쓰기</h1>
                <div className={styles.categorySelect}>
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
                <div className={styles.inputBox}>
                    <input type="text" placeholder="제목을 입력하세요." {...title} />
                </div>
                <Editor height="600px" initialEditType="wysiwyg" {...content} />
                <div className={styles.buttonBox}>
                    <Button onClick={handleSubmit}>글 등록</Button>
                </div>
            </form>
        </div>
    );
};

export default Writing;
