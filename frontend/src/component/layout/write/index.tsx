import Left from 'component/common/left';
import Right from "component/common/right";
import { useRef, useEffect, forwardRef, useCallback } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./editor'), { ssr: false });
const EditorWithForwardedRef = forwardRef((props, ref) => (
    <Editor {...props} forwardedRef={ref} />
))

export default function Write(props) {
    const editorRef = useRef(null);
    const handleChange = useCallback(() => {
        if (!editorRef) {
            return;
        }
        console.log(editorRef.current);
        const instance = editorRef.current.getInstance();
    })
    return (
        <div>
            <Editor
                {...props}
                height="600px"
                initialEditType="wysiwyg"
                ref={editorRef}
            />
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