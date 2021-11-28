import { useState, useEffect } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event);
    };

    return { value, onChange };
};

export default useInput;
