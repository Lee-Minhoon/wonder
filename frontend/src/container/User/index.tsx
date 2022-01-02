import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import constants
import category from 'constants/category';
import readAllPost from 'service/post/readAllPost';
import readUser, { readUserResponse } from './../../service/user/readUser';
import useSearchParams from './../../hooks/useSearchParams';
import { useError, useRendersCount } from 'react-use';
import useReadUser from './../../hooks/useAbc';
import { SourceMap } from 'module';
import { useGetReadUser } from 'hooks/useGetReadUser';

export interface readUserInput {
    id: any;
}

const User = () => {
    const router = useRouter();
    const [user, setUser] = useState<readUserResponse>(null);

    const { data: getReadUserResponse, isLoading, refetch, isSuccess } = useGetReadUser(router.query?.id);

    console.log(getReadUserResponse?.data);

    // const handleReadUser = async (input: readUserInput) => {
    //     const readUserResponse = await readUser(input);
    //     console.log(readUserResponse);
    //     if (readUserResponse) {
    //         setUser(readUserResponse.data);
    //     }
    // };
    // const readUserInputValue: readUserInput = {
    //     id: router.query.id,
    // };
    // handleReadUser(readUserInputValue);

    // const { id } = router.query;

    // useEffect(() => {
    //     const userId = router.query?.id;
    //     const readUserInputValue: readUserInput = {
    //         id: userId,
    //     };
    //     setUserId(1);
    //     console.log(userId);
    //     if (userId) {
    //         refetch();
    //         readUser(readUserInputValue).then((res) => {
    //             console.log(res.data);
    //             setUser(res.data);
    //         });
    //     }
    // }, [router]);

    const [a, setA] = useState(0);
    useEffect(() => {
        console.log(a);
        setA(1);
        console.log(a);
    });

    // useEffect(() => {
    //     const userId = router.query.id;
    //     console.log('useEffect : ', userId);
    //     // const userId = router.query?.id;
    //     // if (userId) {
    //     //     handleReadUser({ id: userId });
    //     // }

    //     // return (
    //     //     잎 ㅔ이지를 빠져나갈때
    //     // )
    // }, [router]);

    return (
        <>
            <header></header>
            {isLoading && <p>loading.....</p>}
            {!isSuccess && <p>error message</p>}
            {/* <section>{user?.nickname}</section> */}
            <footer></footer>
        </>
    );
};

export default User;
