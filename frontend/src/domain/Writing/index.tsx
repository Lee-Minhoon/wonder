import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// import constants
import category from 'constants/category';

// import hooks
import useInput from 'hooks/useInput';
import useEditor from 'hooks/useEditor';

// import components
import BoardTitle from 'components/BoardTitle/BoardTitle';
import Divider from 'components/Divider/Divider';
import Editor from './Editor';

// import styles
import styles from './styles.module.scss';

const Writing = () => {
    const loc = useSelector((state) => state.category.main);
    const main = category.find((item) => item.url === loc);

    const title = useInput('');
    const data = useEditor('');

    const write = () => {
        console.log(title.value);
        console.log(data.value);
    };

    return (
        <>
            {main && (
                <div className={styles.writing}>
                    <BoardTitle title={main.title} url={main.url} />
                    <Divider />
                    <input type="text" placeholder="제목을 입력하세요." {...title} />
                    <Editor height="600px" initialEditType="wysiwyg" {...data} />
                    <button onClick={write}>글쓰기</button>
                </div>
            )}
        </>
    );
};

export default Writing;
