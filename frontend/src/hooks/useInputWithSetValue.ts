// import package, library
import { useState } from 'react';

// import utilities

// import components

// import etc

const useInputWithSetValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return { value, setValue, onChange };
};

export default useInputWithSetValue;
