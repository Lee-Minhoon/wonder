import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import constants
import { readUser } from 'hooks/user/useReadUser';

import useReadUser from '../../hooks/user/useReadUser';

export interface readUserInput {
    id: any;
}

const User = () => {
    const router = useRouter();

    const readUserInputValue: readUserInput = {
        id: router.query.id,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadUser(readUserInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const user = data.data;

    return (
        <>
            <header></header>
            <section>{user.nickname}</section>
            <footer></footer>
        </>
    );
};

export default User;
