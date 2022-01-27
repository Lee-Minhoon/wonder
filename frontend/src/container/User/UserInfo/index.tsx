// import package, library
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useReadUser from 'hooks/user/useReadUser';

// import components

// import etc
import styles from './styles.module.scss';

export interface readUserInput {
    id: any;
}

const UserInfo = () => {
    const router = useRouter();

    const readUserInputValue: readUserInput = {
        id: router.query.id,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadUser(readUserInputValue);

    if (isLoading) {
        return <p>Loading......</p>;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const user = data.data;

    return (
        <>
            <div className={styles.userInfo}>
                <div className={styles.profileWrapper}>
                    <div className={styles.profile}>
                        <Image src="/123.png" alt="profile" layout="fill" />
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.basicInfo}>
                        <h1>{user.nickname}</h1>
                        <p>{user.grade}</p>
                    </div>
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
                                <td>1000000000</td>
                                <th>팔로잉</th>
                                <td>1</td>
                            </tr>
                            <tr>
                                <th>경험치</th>
                                <td>1</td>
                                <th>랭킹</th>
                                <td>1</td>
                            </tr>
                            <tr>
                                <th>마지막 로그인</th>
                                <td>1</td>
                                <th>가입일</th>
                                <td>1</td>
                            </tr>
                            <tr>
                                <th>게시글 수</th>
                                <td>1</td>
                                <th>댓글 수</th>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>소개말</div>
        </>
    );
};

export default UserInfo;
