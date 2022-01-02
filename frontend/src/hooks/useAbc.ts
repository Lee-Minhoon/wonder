import { useRouter } from 'next/router';

// import constants
import category from 'constants/category';
import { useEffect, useState, useCallback } from 'react';
import readUser, { readUserResponse } from 'service/user/readUser';
import { readUserInput } from 'container/User';

function useReadUser<T, F>(initialValue: readUserInput, action) {
    const [data, setData] = useState<readUserResponse>(null);

    const handleReadUser = useCallback(
        async (input: any) => {
            const readUserResponse = await action(input);
            if (readUserResponse) {
                setUser(readUserResponse.data as readUserResponse);
            }
        },
        if (t === action.userRead)
        [setUser]
    );

    useEffect(() => {
        handleReadUser(initialValue);
    }, [initialValue, handleReadUser]);
    return [user];
}

// const useReadUser = (queryId: string) => {
//     const [user, setUser] = useState<readUserResponse>(null);
//     const handleReadUser = async (input: readUserInput) => {
//         const readUserResponse = await readUser(input);
//         console.log(readUserResponse);
//         if (readUserResponse) {
//             setUser(readUserResponse.data);
//         }
//     };
//     const readUserInputValue: readUserInput = {
//         id: router.query.id,
//     };
//     handleReadUser(readUserInputValue);
// };

export default useReadUser;
