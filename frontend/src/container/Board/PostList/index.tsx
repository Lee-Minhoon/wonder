// import components
import PostItem from './PostItem';
import readAllPost from 'service/post/readAllPost';

// import styles
import styles from '../styles.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface readAllPostInput {
    page: any;
    size: any;
}

const PostList = () => {
    // const paging = usePaging();
    const router = useRouter();
    const page = router.query.page;
    const size = router.query.size;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!router.isReady) return;
        const readAllPostInputValue: readAllPostInput = {
            page: page,
            size: size,
        };
        readAllPost(readAllPostInputValue).then((res) => {
            setPosts(res.data);
        });
    }, [router, page, size]);

    return (
        <table className={styles.list} cellSpacing="0">
            <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '80px' }} />
                <col />
                <col style={{ width: '100px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '80px' }} />
                <col style={{ width: '40px' }} />
            </colgroup>
            <thead>
                <th>카테고리</th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
                <th>추천</th>
            </thead>
            <tbody>
                {posts.map((item) => (
                    <PostItem key={item.id} title={item.title} views={item.views} />
                ))}
            </tbody>
        </table>
    );
};

export default PostList;
