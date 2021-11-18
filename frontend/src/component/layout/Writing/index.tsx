import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import styles from './styles.module.scss';
import Editor from './Editor';
import Title from 'component/common/BoardTitle';

export default function Writing() {
    const title = useRef(null);
    const [data, setData] = useState(null);

    const applyData = (Data) => {
        setData(() => Data);
    }

    const save = () => {
        console.log(title.current.value);
        console.log(data);
    }

    return (
        <div className={styles.writing}>
            <Title />
            <input type="text" ref={title} placeholder="제목을 입력하세요." />
            <Editor
                height="600px"
                initialEditType="wysiwyg"
                applyData={applyData}
            />
            <button onClick={save}>글쓰기</button>
        </div>
    )
}