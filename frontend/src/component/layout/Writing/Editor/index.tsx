import { useRef, useEffect, forwardRef, useCallback } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';

const WrappedEditor = dynamic(() => import('./WrappedEditor'), { ssr: false });

// EditorWithForwardedRef는 전달된 ref를 얻는다.
const EditorWithForwardedRef = forwardRef((props, ref) => (
    // 전달받은 ref는 props를 통해 Editor로 전달됨
    <WrappedEditor {...props} forwardedRef={ref} />
))

export default function Editor(props) {
    const editorRef = useRef(null);

    const handleChange = useCallback(() => {
        if (!editorRef.current) {
            return;
        }
        const instance = editorRef.current.getInstance();
        console.log(instance.getHTML());
    }, [props, editorRef]);

    return (
        <div>
            <textarea />
            <EditorWithForwardedRef
                {...props}
                height="600px"
                initialEditType="wysiwyg"
                ref={editorRef} // EditorWithForwardedRef컴포넌트로 ref를 전달
            // onChange={handleChange}
            />
            <button onClick={handleChange}>sd</button>
        </div>
    )
}

// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// const Editor = dynamic(() => import('@toast-ui/react-editor').then(m => m.Editor), { ssr: false });
// const colorSyntax = () => dynamic(() => import('@toast-ui/editor-plugin-color-syntax').then(m => m.default), { ssr: false });

// export default function Write() {
//     return (
//         <Editor
//             initialValue="hello react editor world!"
//             previewStyle="vertical"
//             height="600px"
//             initialEditType="markdown"
//             useCommandShortcut={true}
//             plugins={[colorSyntax]}
//         />
//     )
// }