// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllPostByUser from 'hooks/post/useReadAllPostByUser';

// import components
import UserInfo from 'components/UserInfo';
import PostList from 'components/PostList';
import PostUtil from 'components/PostUtil';
import Pagination from 'components/Pagination';
import SearchBar from 'components/SearchBar';

// import etc
import styles from './styles.module.scss';

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
            <UserInfo userId={router.query!.id} />
            <PostUtil pages={posts.pages} count={posts.count} handleChange={handleChange} handleClick={handleClick} />
            <section>
                <PostList posts={posts.data} />
            </section>
            <footer>
                <Pagination pages={posts.pages} />
                <SearchBar width="300px" height="30px" />
            </footer>
        </div>
    );
};

export default User;
