// import package, library
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import InfoTable from './InfoTable';
import Button from 'components/Button';
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';

const UserBasicInfo = () => {
    const router = useRouter();
    const userId = useTypedSelector((state) => state.user.userId);

    const readUserInputValue: readUserInput = {
        id: parseInt(router.query?.id.toString()),
    };
    const {
        data: userData,
        error: userError,
        isLoading: userIsLoading,
        isSuccess: userIsSuccess,
        isError: userIsError,
    } = useReadUser(readUserInputValue);

    return (
        <div className={styles.userBasicInfo}>
            {userIsLoading && <Loading />}
            {userIsError && <p>{userError.response.data?.message}</p>}
            {userIsSuccess && (
                <>
                    <div className={styles.imageWrapper}>
                        <div>
                            <Image src="/123.png" alt="profile" layout="fill" />
                        </div>
                    </div>
                    <div className={styles.infoWrapper}>
                        <h1>{userData.data.nickname}</h1>
                        <p>{userData.data.grade}</p>
                    </div>
                    <div className={styles.buttonWrapper}>
                        {userId == router.query?.id ? (
                            <Button onClick={() => console.log('test')}>설정</Button>
                        ) : userData.data.followStatus ? (
                            <>
                                <Button onClick={() => console.log('test')}>쪽지</Button>
                                <Button onClick={() => console.log('test')}>언팔로우</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => console.log('test')}>쪽지</Button>
                                <Button onClick={() => console.log('test')}>팔로우</Button>
                            </>
                        )}
                    </div>
                    <div className={styles.expWrapper}>경험치 랭킹</div>
                    <InfoTable user={userData.data} />
                </>
            )}
        </div>
    );
};

export default UserBasicInfo;
