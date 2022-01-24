// import package, library
import { useState } from 'react';

// import utilities

// import components

// import etc

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event);
    };

    return { value, onChange };
};

export default useInput;
