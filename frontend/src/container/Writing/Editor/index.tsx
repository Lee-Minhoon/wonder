import { useRef, forwardRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const WrappedEditor = dynamic(async () => await import('./WrappedEditor'), { ssr: false });

// EditorWithForwardedRef는 전달된 ref를 얻는다.
const EditorWithForwardedRef = forwardRef((props, ref) => (
    // 전달받은 ref는 props를 통해 Editor로 전달됨
    <WrappedEditor {...props} forwardedRef={ref} />
));
EditorWithForwardedRef.displayName = 'Editor';

const Editor = (props) => {
    const ref = useRef(null);

    const handleChange = useCallback(() => {
        if (!ref.current) {
            return;
        }

        const instance = ref.current.getInstance();
        props.onChange(instance.getHTML());
    }, [props, ref]);

    return (
        <EditorWithForwardedRef
            {...props}
            ref={ref} // EditorWithForwardedRef컴포넌트로 ref를 전달
            onChange={handleChange}
        />
    );
};

export default Editor;
