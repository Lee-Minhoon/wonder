import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default function Editor() {
    return (
        <ToastEditor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            plugins={[colorSyntax]}
        />
    )
}