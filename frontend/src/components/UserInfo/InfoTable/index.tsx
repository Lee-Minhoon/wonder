// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const InfoTable = ({ user }) => {
    const createdAt = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(user.createdAt));
    const loggedInAt = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(user.createdAt));

    return (
        <table className={styles.infoTable} cellSpacing="0">
            <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
            </colgroup>
            <tbody>
                <tr>
                    <th>팔로워</th>
                    <td>{user.countFollowers}</td>
                    <th>팔로잉</th>
                    <td>{user.countFollowees}</td>
                </tr>
                <tr>
                    <th>게시글 수</th>
                    <td>{user.countPosts}</td>
                    <th>댓글 수</th>
                    <td>{user.countComments}</td>
                </tr>
                <tr>
                    <th>가입일</th>
                    <td>{createdAt}</td>
                    <th>마지막 로그인</th>
                    <td>{loggedInAt}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default InfoTable;
