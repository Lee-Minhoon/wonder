import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import constants
import category from 'constants/category';
import readAllPost from 'service/post/readAllPost';

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import PostList from './PostList';
import Pagination from './Pagination';
import SearchBar from 'components/SearchBar';
import Link from 'next/link';

// import styles
import styles from './styles.module.scss';
import useCategory from 'hooks/useCategory';

export interface readAllPostInput {
    category: any;
    page: any;
    size: any;
}

const Board = () => {
    const router = useRouter();
    const category = useCategory();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!router.isReady) return;
        const readAllPostInputValue: readAllPostInput = {
            category: category.sub.id,
            page: router.query.page - 1,
            size: router.query.size,
        };
        readAllPost(readAllPostInputValue).then((res) => {
            console.log(res.data);
            setPosts(res.data);
        });
    }, [router, category.sub.id]);

    const block = 10;
    const totalBlock = parseInt(posts.pages / block) + 1;
    const currentBlock = parseInt((router.query.page - 1) / block) + 1;
    const startPage = currentBlock * block - (block - 1);
    const endPage = Math.min(currentBlock * block, posts.pages);
    console.log(totalBlock, currentBlock, startPage, endPage);

    const pagination = () => {
        const result = [];
        if (startPage > 1) {
            result.push(
                <li>
                    <Link
                        href={{
                            query: {
                                main: router.query.main,
                                sub: router.query.sub,
                                page: startPage - 1,
                                size: router.query.size,
                            },
                        }}
                    >
                        <a>이전 페이지</a>
                    </Link>
                </li>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            result.push(
                <li>
                    <Link
                        href={{
                            query: {
                                main: router.query.main,
                                sub: router.query.sub,
                                page: i,
                                size: router.query.size,
                            },
                        }}
                    >
                        <a>{i}</a>
                    </Link>
                </li>
            );
        }
        if (endPage < posts.pages) {
            result.push(
                <li>
                    <Link
                        href={{
                            query: {
                                main: router.query.main,
                                sub: router.query.sub,
                                page: endPage + 1,
                                size: router.query.size,
                            },
                        }}
                    >
                        <a>다음 페이지</a>
                    </Link>
                </li>
            );
        }
        return result;
    };

    return (
        <>
            <header>
                <BoardTitle title={category.main.title} url={category.main.url} />
                <Divider />
                <Banner />
                <div className={styles.util}>
                    {posts.count}개의 글 몇개씩 보기
                    <Link
                        href={{ pathname: '/board/write', query: { main: category.main.url, sub: category.sub.url } }}
                    >
                        <a>글쓰기</a>
                    </Link>
                </div>
            </header>
            <section>
                <PostList posts={posts.posts} />
            </section>
            <footer className={styles.footer}>
                <nav className={styles.page}>
                    <ul>{pagination()}</ul>
                </nav>
                <SearchBar width="300px" height="30px" />
            </footer>
        </>
    );
};

export default Board;
