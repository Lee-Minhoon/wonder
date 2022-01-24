// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllPost from 'hooks/post/useReadAllPost';

// import components
import Pagination from './Pagination';
import PostUtil from 'components/PostUtil';
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import PostList from 'components/PostList';
import SearchBar from 'components/SearchBar';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

export interface readAllPostInput {
    category: number;
    page: number;
    size: number;
}

const Board = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);

    const readAllPostInputValue: readAllPostInput = {
        category: sub?.id,
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const { data, error, isLoading, isError } = useReadAllPost(readAllPostInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const posts = data.data;

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

    return (
        <>
            <header>
                <BoardTitle title={main.title} url={main.url} />
                <Divider />
                <Banner />
                <PostUtil
                    pages={posts.pages}
                    count={posts.count}
                    handleChange={handleChange}
                    handleClick={handleClick}
                />
            </header>
            <section>
                <PostList posts={posts.data} />
            </section>
            <footer className={styles.footer}>
                <Pagination pages={posts.pages} />
                <SearchBar width="300px" height="30px" />
            </footer>
        </>
    );
};

export default Board;
