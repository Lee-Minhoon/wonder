// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllPostByUser, { readAllPostByUserInput } from 'hooks/post/useReadAllPostByUser';
import useInput from 'hooks/useInput';

// import components
import PostList from 'components/PostList';
import Loading from 'components/Loading';
import BoardUtil from 'components/BoardUtil';
import Pagination from 'components/Pagination';
import SearchBar from 'components/SearchBar';

// import etc
import styles from './styles.module.scss';

const PostsTab = () => {
    const router = useRouter();
    const searchWord = useInput('');

    const handleOptionsChange = useCallback(
        (e) => {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, size: e.target.value },
            });
        },
        [router]
    );

    const handleWritingClick = useCallback(() => {
        router.push({
            pathname: '/board/write',
            query: { redirect: router.asPath },
        });
    }, [router]);

    const handleSearchClick = useCallback(
        (e) => {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, title: searchWord.value },
            });
        },
        [router, searchWord.value]
    );

    const readAllPostInputValue: readAllPostByUserInput = {
        user: parseInt(router.query.id.toString()),
        title: router.query.title.toString(),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const { data, error, isLoading, isError } = useReadAllPostByUser(readAllPostInputValue);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const posts = data.data;

    return (
        <>
            <BoardUtil
                pages={posts.pages}
                count={posts.count}
                onChange={handleOptionsChange}
                onClick={handleWritingClick}
            />
            <section>
                <PostList posts={posts.data} />
            </section>
            <footer className={styles.footer}>
                <Pagination pages={posts.pages} />
                <SearchBar width="300px" height="30px" input={searchWord} onClick={handleSearchClick} />
            </footer>
        </>
    );
};

export default PostsTab;
