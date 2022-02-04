// import package, library
import Image from 'next/image';

// import utilities
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';

// import components
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';
import InfoTable from './InfoTable';
import Button from 'components/Button';

const UserInfo = ({ userId }) => {
    const readUserInputValue: readUserInput = {
        id: userId,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadUser(readUserInputValue);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const user = data.data;

    const test = () => {
        console.log('fd');
    };

    return (
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
                <div className={styles.buttonWrapper}>
                    <Button onClick={test}>쪽지</Button>
                    <Button onClick={test}>팔로우</Button>
                </div>
                <div className={styles.test}>경험치 랭킹</div>
                <InfoTable />
            </div>
            <div className={styles.intro}>소개말</div>
        </div>
    );
};

export default UserInfo;
