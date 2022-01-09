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
import Button from 'components/Button';
import Emphasise from 'components/Emphasise';
import Span from 'components/Span/index';
import SelectBox from 'components/SelectBox';
import Blank from 'components/Blank';

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

    const options = [
        { id: 1, value: 10, text: '10개씩' },
        { id: 2, value: 20, text: '20개씩' },
        { id: 3, value: 30, text: '30개씩' },
        { id: 4, value: 40, text: '40개씩' },
        { id: 5, value: 50, text: '50개씩' },
    ];

    const handleChange = (e) => {
        router.push({
            pathname: '/board/list',
            query: { ...router.query, size: e.target.value },
        });
    };

    return (
        <>
            <header>
                <BoardTitle title={main.title} url={main.url} />
                <Divider />
                <Banner />
                <div className={styles.util}>
                    <Span>
                        <Emphasise>{posts.pages}</Emphasise>개의 페이지
                    </Span>
                    <Blank />
                    <Span>
                        <Emphasise>{posts.count}</Emphasise>개의 글
                    </Span>
                    <Blank />
                    <SelectBox options={options} onChange={handleChange} selected={router.query.size} />
                    <Blank />
                    <Button onClick={handleClick}>글쓰기</Button>
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
