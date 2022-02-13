// import package, library

// import utilities

// import components
import PostItem from './PostItem';

// import etc
import styles from './styles.module.scss';

const PostList = ({ posts }) => {
    return (
        <table className={styles.postList} cellSpacing="0">
            <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '80px' }} />
                <col />
                <col style={{ width: '120px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '80px' }} />
                <col style={{ width: '40px' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>카테고리</th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                    <th>추천</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((item) => (
                    <PostItem
                        key={item.id}
                        category={item.category}
                        id={item.id}
                        title={item.title}
                        writerId={item.writerId}
                        writer={item.writer}
                        createdAt={item.createdAt}
                        views={item.views}
                        countComments={item.countComments}
                        countRecs={item.countRecs}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default PostList;
