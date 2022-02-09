// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllPosts, { readAllPostsInput } from 'hooks/post/useReadAllPosts';
import useInput from 'hooks/useInput';

// import components
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import BoardUtil from 'components/BoardUtil';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import PostList from 'components/PostList';
import SearchBar from 'components/SearchBar';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Board = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);
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
            query: { main: router.query.main, sub: router.query.sub, redirect: router.asPath },
        });
    }, [router]);

    const handleSearchClick = useCallback(() => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, title: searchWord.value },
        });
    }, [router, searchWord.value]);

    const readAllPostInputValue: readAllPostsInput = {
        category: sub?.id,
        title: router.query?.title?.toString(),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const {
        data: postsData,
        error: postsError,
        isLoading: postsIsLoading,
        isError: postsIsError,
        isSuccess: postsIsSucess,
    } = useReadAllPosts(readAllPostInputValue);

    return (
        <>
            {postsIsLoading && <Loading />}
            {postsIsError && <p>{postsError.response.data.message}</p>}
            {postsIsSucess && (
                <div className={styles.board}>
                    <header>
                        <h1 className={styles.title}>
                            {main.title} – {sub.title}
                        </h1>
                        <Divider />
                        <Banner />
                        <BoardUtil
                            pages={postsData.data.pages}
                            count={postsData.data.count}
                            onChange={handleOptionsChange}
                            onClick={handleWritingClick}
                        />
                    </header>
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

export default Board;
