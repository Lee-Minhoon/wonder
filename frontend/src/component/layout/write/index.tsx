import Left from 'component/common/left';
import Right from "component/common/right";
import { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./editor'), { ssr: false });

export default function Write() {
    return (
        <div>
            <Editor />
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