// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllPostsByUser, { readAllPostsByUserInput } from 'hooks/post/useReadAllPostsByUser';
import useInput from 'hooks/useInput';
import { postWritingPagePath } from 'pages/post/writing';

// import components
import BoardUtil from 'components/BoardUtil';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import PostList from 'components/PostList';
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
            pathname: `${postWritingPagePath}`,
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

    const readAllPostInputValue: readAllPostsByUserInput = {
        user: parseInt(router.query.id.toString()),
        title: router.query.title.toString(),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const {
        data: postsData,
        error: postsError,
        isLoading: postsIsLoading,
        isError: postsIsError,
        isSuccess: postsIsSuccess,
    } = useReadAllPostsByUser(readAllPostInputValue);

    return (
        <>
            {postsIsLoading && <Loading />}
            {postsIsError && <p>{postsError.response.data.message}</p>}
            {postsIsSuccess && (
                <div className={styles.postsTab}>
                    <BoardUtil
                        pages={postsData.data.pages}
                        count={postsData.data.count}
                        onChange={handleOptionsChange}
                        onClick={handleWritingClick}
                    />
                    <section>
                        <PostList posts={postsData.data.data} />
                    </section>
                    <footer className={styles.footer}>
                        <Pagination pages={postsData.data.pages} />
                        <SearchBar width="300px" height="30px" input={searchWord} onClick={handleSearchClick} />
                    </footer>
                </div>
            )}
        </>
    );
};

export default PostsTab;
