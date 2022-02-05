// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';
import useCreateFollow, { createFollowInput } from 'hooks/follow/useCreateFollow';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import InfoTable from './InfoTable';
import Loading from 'components/Loading';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const UserInfo = ({ userId }) => {
    const router = useRouter();
    const loginId = useTypedSelector((state) => state.user.userId);
    const createFollow = useCreateFollow();

    const handleFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createFollowInputValue: createFollowInput = {
                followeeId: userId,
            };
            createFollow.mutate(createFollowInputValue);
        },
        [userId, createFollow]
    );

    if (createFollow.isLoading) {
        console.log('팔로우 중..');
    }
    if (createFollow.isError) {
        const errorStatus = createFollow.error.response.status;
        if (errorStatus == 400) {
            console.log('자기 자신은 팔로우 할 수 없음');
        }
        if (errorStatus == 401) {
            console.log('로그인 되지 않음');
            router.push('/auth/login');
        } else if (errorStatus == 409) {
            console.log('이미 팔로우 함');
        }
    }
    if (createFollow.isSuccess) {
        console.log('팔로우 성공');
    }

    const readUserInputValue: readUserInput = {
        id: userId,
    };
    const { data, error, isLoading, isSuccess, isError } = useReadUser(readUserInputValue);

    if (isLoading) return <Loading />;
    if (isError) return <p>{error.response.data.message}</p>;
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
                    {loginId == userId ? (
                        <></>
                    ) : (
                        <>
                            <Button onClick={test}>쪽지</Button>
                            <Button onClick={handleFollowClick}>팔로우</Button>
                        </>
                    )}
                </div>
                <div>경험치 랭킹</div>
                <InfoTable />
            </div>
            <div className={styles.intro}>소개말</div>
        </div>
    );
};

export default UserInfo;
