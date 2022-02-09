// import package, library
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreatePost, { createPostInput } from 'hooks/post/useCreatePost';
import useUpdatePost, { updatePostInput } from 'hooks/post/useUpdatePost';
import useReadPostEnabled, { readPostInput } from 'hooks/post/useReadPostEnabled';
import useInput from 'hooks/useInput';
import useEditor from 'hooks/useEditor';

// import components
import Editor from './Editor';
import SelectBox from 'components/SelectBox';
import Button from 'components/Button';
import Loading from 'components/Loading';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Writing = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);
    const [updateMode, setUpdateMode] = useState(router.query?.update ? true : false);
    const [mainCategoryId, setMainCategoryId] = useState<number>(main?.id);
    const [subCategoryId, setSubCategoryId] = useState<number>(sub?.id);
    const createPost = useCreatePost();
    const updatePost = useUpdatePost();
    const title = useInput('');
    const content = useEditor('');

    const handleCreatePostSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!mainCategoryId || !subCategoryId || mainCategoryId === 0 || subCategoryId % 10 === 0) {
                alert('카테고리가 선택되지 않았습니다.');
                return;
            }
            const createPostInputValue: createPostInput = {
                category: subCategoryId,
                title: title.value,
                content: content.value,
            };
            createPost.mutate(createPostInputValue);
        },
        [mainCategoryId, subCategoryId, title.value, content.value, createPost]
    );

    const handleUpdatePostSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!mainCategoryId || !subCategoryId || mainCategoryId === 0 || subCategoryId % 10 === 0) {
                alert('카테고리가 선택되지 않았습니다.');
                return;
            }
            const updatePostInputValue: updatePostInput = {
                id: parseInt(router.query?.update.toString()),
                category: subCategoryId,
                title: title.value,
                content: content.value,
            };
            updatePost.mutate(updatePostInputValue);
        },
        [mainCategoryId, subCategoryId, router.query?.update, title.value, content.value, updatePost]
    );

    const mainOptions = category.map((item) => {
        return { id: item.id, value: item.id, text: item.title };
    });

    mainOptions.unshift({ id: 0, value: 0, text: '카테고리' });

    const subOptions = category
        .find((item) => item.id === mainCategoryId)
        ?.sub.map((item) => {
            if (item.id % 10 === 0) return { id: item.id, value: item.id, text: '카테고리' };
            return { id: item.id, value: item.id, text: item.title };
        });

    const readPostInputValue: readPostInput = {
        id: router.query?.update,
    };
    const {
        data: postData,
        error: postError,
        isLoading: postIsLoading,
        isSuccess: postIsSuccess,
        isError: postIsError,
        refetch: postRefetch,
    } = useReadPostEnabled(readPostInputValue);

    useEffect(() => {
        if (updateMode) {
            postRefetch();
        }
    }, [postRefetch, updateMode]);

    useEffect(() => {
        if (postData?.data && postIsSuccess) {
            title.setValue(postData?.data.title);
            content.setValue(postData?.data.content);
            const temp = category.find((item) => item.id === Math.floor(postData.data?.categoryId / 10));
            setMainCategoryId(temp.id);
            setSubCategoryId(temp?.sub.find((item) => item.id === postData.data?.categoryId).id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postData?.data, postIsSuccess]);

    return (
        <>
            {createPost.isLoading && <Requesting />}
            <>
                {updateMode && postIsLoading && <Loading />}
                {updateMode && postIsError && <p>{postError.response.data.message}</p>}
                {(!updateMode || (updateMode && postIsSuccess)) && (
                    <div className={styles.writing}>
                        <form>
                            <h1>글쓰기</h1>
                            <div className={styles.categorySelect}>
                                <SelectBox
                                    options={mainOptions}
                                    onChange={(e) => setMainCategoryId(parseInt(e.target.value))}
                                    selected={mainCategoryId}
                                />
                                <SelectBox
                                    options={subOptions}
                                    onChange={(e) => setSubCategoryId(parseInt(e.target.value))}
                                    selected={subCategoryId}
                                />
                            </div>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="제목을 입력하세요." {...title} />
                            </div>
                            <Editor
                                height="600px"
                                initialEditType="wysiwyg"
                                initValue={postData?.data.content}
                                {...content}
                            />
                            <div className={styles.buttonBox}>
                                {!updateMode && <Button onClick={handleCreatePostSubmit}>글 등록</Button>}
                                {updateMode && <Button onClick={handleUpdatePostSubmit}>글 수정</Button>}
                            </div>
                        </form>
                    </div>
                )}
            </>
        </>
    );
};

export default Writing;
