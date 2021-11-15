import { useState, createRef, useCallback } from 'react';
import PropTypes from 'prop-types'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor as ToastEditor, EditorProps } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

function Editor(props) {
    const { forwardedRef } = props;

    return (
        <>
            <ToastEditor
                {...props}
                ref={props.forwardedref}
                plugins={[colorSyntax]}
            />
        </>
    )
}

// Editor.propTypes = {
//     props: PropTypes.object,
//     forwardedRef: PropTypes.shape({
//         current: PropTypes.instanceOf(Element)
//     }).isRequired
// }

export default Editor;