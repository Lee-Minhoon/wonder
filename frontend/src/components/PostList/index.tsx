// import components
import PostItem from './PostItem';

// import styles
import styles from './styles.module.scss';

const PostList = (props) => {
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
                {props.posts &&
                    props.posts.map((item) => (
                        <PostItem
                            key={item.id}
                            category={item.category}
                            id={item.id}
                            title={item.title}
                            writerId={item.writerId}
                            writer={item.writer}
                            createDate={item.createDate}
                            comments={item.comments}
                            views={item.views}
                            likes={item.likes}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export default PostList;
