import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import constants
import { readUser } from 'hooks/user/useReadUser';

import useReadUser from '../../hooks/user/useReadUser';
import styles from './styles.module.scss';

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
        <div className={styles.user}>
            <header>
                <div className={styles.profile}>프로필</div>
                <div className={styles.info}>
                    <p>{user.nickname}</p>
                    <p>{user.grade}</p>
                </div>
            </header>
            <section>가 쓴글</section>
            <footer></footer>
        </div>
    );
};

export default User;
