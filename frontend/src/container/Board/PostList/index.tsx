// import components
import PostItem from './PostItem';
import readAllPost from 'service/post/readAllPost';

// import styles
import styles from '../styles.module.scss';
import { useEffect } from 'react';

export interface readAllPostInput {
    page: any;
    size: any;
}

const PostList = () => {
    useEffect(() => {
        const readAllPostInputValue: readAllPostInput = {
            page: 1,
            size: 20,
        };
        readAllPost(readAllPostInputValue).then((res) => {
            console.log(res);
        });
    }, []);

    const titles = [
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
        'Q&A',
        '커뮤니티',
        '강의실',
        '구인구직',
        '외주',
    ];
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
                {titles.map((item) => (
                    <PostItem />
                ))}
            </tbody>
        </table>
    );
};

export default PostList;
