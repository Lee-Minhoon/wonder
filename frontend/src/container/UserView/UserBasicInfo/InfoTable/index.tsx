// import package, library

// import utilities
import * as dateService from 'service/format';

// import components

// import etc
import styles from './styles.module.scss';

const InfoTable = ({ user }) => {
    const createdAt = dateService.isToday(new Date(user.createdAt))
        ? dateService.formatTime(new Date(user.createdAt))
        : dateService.formatDate(new Date(user.createdAt));
    const loggedInAt = dateService.isToday(new Date(user.loggedInAt))
        ? dateService.formatTime(new Date(user.loggedInAt))
        : dateService.formatDate(new Date(user.loggedInAt));

    return (
        <table className={styles.infoTable} cellSpacing="0">
            <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '65%' }} />
            </colgroup>
            <tbody>
                <tr>
                    <th>팔로워</th>
                    <td>{user.countFollowers}</td>
                </tr>
                <tr>
                    <th>팔로잉</th>
                    <td>{user.countFollowees}</td>
                </tr>
                <tr>
                    <th>게시글 수</th>
                    <td>{user.countPosts}</td>
                </tr>
                <tr>
                    <th>댓글 수</th>
                    <td>{user.countComments}</td>
                </tr>
                <tr>
                    <th>가입일</th>
                    <td>{createdAt}</td>
                </tr>
                <tr>
                    <th>마지막 로그인</th>
                    <td>{loggedInAt}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default InfoTable;
