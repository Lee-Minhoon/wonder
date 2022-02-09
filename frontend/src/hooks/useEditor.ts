// import package, library
import { useState } from 'react';

// import utilities

// import components

// import etc

const useEditor = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event);
    };

    return { value, setValue, onChange };
};

export default useEditor;
