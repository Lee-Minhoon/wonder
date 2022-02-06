// import package, library
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import InfoTable from './InfoTable';
import Loading from 'components/Loading';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const UserBasicInfo = () => {
    const router = useRouter();
    const userId = useTypedSelector((state) => state.user.userId);

    const readUserInputValue: readUserInput = {
        id: router.query?.id,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadUser(readUserInputValue);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>{error.response.data.message}</p>;
    }

    const user = data.data;

    return (
        <div className={styles.userBasicInfo}>
            <div className={styles.profileWrapper}>
                <div className={styles.profile}>
                    <Image src="/123.png" alt="profile" layout="fill" />
                </div>
            </div>
            <div className={styles.basicInfo}>
                <h1>{user.nickname}</h1>
                <p>{user.grade}</p>
            </div>
            <div className={styles.buttonWrapper}>
                {userId == router.query?.id ? (
                    <Button onClick={() => console.log('test')}>설정</Button>
                ) : (
                    <>
                        <Button onClick={() => console.log('test')}>쪽지</Button>
                        <Button onClick={() => console.log('test')}>팔로우</Button>
                    </>
                )}
            </div>
            <div className={styles.expWrapper}>경험치 랭킹</div>
            <InfoTable />
        </div>
    );
};

export default UserBasicInfo;
