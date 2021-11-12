import Left from 'component/common/left';
import Right from "component/common/right";
import { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';

const Editor = dynamic(() => import('@toast-ui/react-editor').then(m => m.Editor), { ssr: false });


export default function Write() {
    return (
        <div>
            <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
        </div>
    )
}