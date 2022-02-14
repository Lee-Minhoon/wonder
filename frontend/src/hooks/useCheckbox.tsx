// import package, library
import { useState } from 'react';

// import utilities

// import components

// import etc

const useCheckbox = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const render = <input type="checkbox" onClick={(e) => console.log(e.target.checked)}></input>;

    return { value, render };
};

export default useCheckbox;
