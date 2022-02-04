// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const InfoTable = () => {
    return (
        <table className={styles.infoTable} cellSpacing="0">
            <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '65%' }} />
            </colgroup>
            <tbody>
                <tr>
                    <th>팔로워</th>
                    <td>1000000000</td>
                </tr>
                <tr>
                    <th>팔로잉</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>게시글 수</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>댓글 수</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>가입일</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>마지막 로그인</th>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    );
};

export default InfoTable;
