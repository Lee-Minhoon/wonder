import { useRouter } from 'next/router';
// import constants

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import PostList from './PostList';
import SearchBar from 'components/SearchBar';
import Link from 'next/link';

// import styles
import styles from './styles.module.scss';
import category from 'constants/category';
import useReadAllPost from 'hooks/post/useReadAllPost';
import Pagination from './Pagination';

export interface readAllPostInput {
    category: number;
    page: number;
    size: number;
}

const Board = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main.sub.find((item) => item.url === router.query.sub);

    const readAllPostInputValue: readAllPostInput = {
        category: sub.id,
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

    return (
        <>
            <header>
                <BoardTitle title={main.title} url={main.url} />
                <Divider />
                <Banner />
                <div className={styles.util}>
                    {posts.pages}개의 페이지, {posts.count}개의 글 몇개씩 보기
                    <Link href={{ pathname: '/board/write', query: { ...router.query } }}>
                        <a>글쓰기</a>
                    </Link>
                </div>
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
