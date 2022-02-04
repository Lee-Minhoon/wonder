// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllPost, { readAllPostInput } from 'hooks/post/useReadAllPost';
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

    const handleSearchClick = useCallback(
        (e) => {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, title: searchWord.value },
            });
        },
        [router, searchWord.value]
    );

    const readAllPostInputValue: readAllPostInput = {
        category: sub?.id,
        title: router.query?.title.toString(),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const { data, error, isLoading, isError } = useReadAllPost(readAllPostInputValue);

    if (isLoading) return <Loading />;
    if (isError) return <p>{error.response.data.message}</p>;

    const posts = data.data;

    return (
        <div className={styles.board}>
            <header>
                <h1 className={styles.title}>
                    {main.title} – {sub.title}
                </h1>
                <Divider />
                <Banner />
                <BoardUtil
                    pages={posts.pages}
                    count={posts.count}
                    onChange={handleOptionsChange}
                    onClick={handleWritingClick}
                />
            </header>
            <section>
                <PostList posts={posts.data} />
            </section>
            <footer className={styles.footer}>
                <Pagination pages={posts.pages} />
                <SearchBar width="300px" height="30px" input={searchWord} onClick={handleSearchClick} />
            </footer>
        </div>
    );
};

export default Board;
