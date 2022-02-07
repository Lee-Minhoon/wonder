// import package, library
import { useCallback } from 'react';
import Image from 'next/image';

// import utilities
import useCreateFollow, { createFollowInput } from 'hooks/follow/useCreateFollow';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import InfoTable from './InfoTable';
import Button from 'components/Button';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const UserInfo = ({ user }) => {
    const loginUserId = useTypedSelector((state) => state.user.userId);
    const createFollow = useCreateFollow();

    const handleFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createFollowInputValue: createFollowInput = {
                followeeId: user.id,
            };
            createFollow.mutate(createFollowInputValue);
        },
        [user, createFollow]
    );

    return (
        <>
            {createFollow.isLoading && <Requesting />}
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
                        {loginUserId == user.id ? (
                            <></>
                        ) : (
                            <>
                                <Button onClick={() => console.log('test')}>쪽지</Button>
                                <Button onClick={handleFollowClick}>팔로우</Button>
                            </>
                        )}
                    </div>
                    <div>경험치 랭킹</div>
                    <InfoTable />
                </div>
                <div className={styles.intro}>소개말</div>
            </div>
        </>
    );
};

export default UserInfo;
