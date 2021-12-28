// import components
import PostItem from './PostItem';
import readAllPost from 'service/post/readAllPost';

// import styles
import styles from '../styles.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useCategory from 'hooks/useCategory';

export interface readAllPostInput {
    category: any;
    page: any;
    size: any;
}

const PostList = () => {
    const router = useRouter();
    const category = useCategory();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!router.isReady) return;
        const readAllPostInputValue: readAllPostInput = {
            category: category.sub.id,
            page: router.query.page,
            size: router.query.size,
        };
        readAllPost(readAllPostInputValue).then((res) => {
            console.log(res.data);
            setPosts(res.data);
        });
    }, [router, category.sub.id]);

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
                    <PostItem
                        key={item.id}
                        category={item.category}
                        id={item.id}
                        title={item.title}
                        writer={item.writer}
                        createDate={item.createDate}
                        views={item.views}
                        likes={item.likes}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default PostList;
