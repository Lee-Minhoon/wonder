import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import constants
import { readUser } from 'hooks/user/useReadUser';
import PostList from 'components/PostList';

import useReadUser from '../../hooks/user/useReadUser';
import styles from './styles.module.scss';
import Heading from 'components/ColoredHeading';
import Divider from 'components/Divider';
import UserInfo from './UserInfo';
import useReadAllPostByUser from 'hooks/post/useReadAllPostByUser';
import PostUtil from 'components/PostUtil';

export interface readUserInput {
    id: any;
}

export interface readAllPostByUserInput {
    user: any;
    page: number;
    size: number;
}

const User = () => {
    const router = useRouter();

    const readAllPostInputValue: readAllPostByUserInput = {
        user: router.query.id,
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const { data, error, isLoading, isError } = useReadAllPostByUser(readAllPostInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const handleClick = () => {
        router.push({
            pathname: '/board/write',
            query: { ...router.query },
        });
    };

    const handleChange = (e) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, size: e.target.value },
        });
    };

    const posts = data.data;
    return (
        <div className={styles.user}>
            <UserInfo />
            <PostUtil pages={posts.pages} count={posts.count} handleChange={handleChange} handleClick={handleClick} />
            <section>
                <PostList posts={posts.data} />
            </section>
            <footer></footer>
        </div>
    );
};

export default User;
