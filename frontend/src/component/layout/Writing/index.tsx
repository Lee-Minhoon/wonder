import { useRef, useState, useEffect, forwardRef, useCallback } from 'react';
import styles from './styles.module.scss';
import Editor from './Editor';

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
        <>
            <input type="text" ref={title} />
            <Editor
                height="600px"
                initialEditType="wysiwyg"
                applyData={applyData}
            />
            <button onClick={save}>d</button>
        </>
    )
}