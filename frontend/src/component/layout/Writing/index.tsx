import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import styles from './styles.module.scss';
import Editor from './Editor';
import Title from 'component/common/BoardTitle';

const Writing = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');

    const applyData = (Data) => {
        setData(() => Data);
    }

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const write = () => {
        console.log(title);
        console.log(data);
    }

    return (
        <div className={styles.writing}>
            <Title />
            <input type="text" placeholder="제목을 입력하세요." onChange={handleChange} />
            <Editor
                height="600px"
                initialEditType="wysiwyg"
                applyData={applyData}
            />
            <button onClick={write}>글쓰기</button>
        </div>
    )
}

export default Writing;