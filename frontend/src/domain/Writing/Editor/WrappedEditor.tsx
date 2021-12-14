import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

const WrappedEditor = (props) => {
    const { forwardedRef } = props;

    return <Editor {...props} ref={forwardedRef} plugins={[colorSyntax]} />;
};

WrappedEditor.propTypes = {
    props: PropTypes.object,
    forwardedRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element),
    }).isRequired,
};

export default WrappedEditor;
