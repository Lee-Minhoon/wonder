// import package, library
import { useCallback } from 'react';
import Image from 'next/image';

// import utilities
import useCreateFollow, { createFollowInput } from 'hooks/follow/useCreateFollow';
import useDeleteFollow, { deleteFollowInput } from 'hooks/follow/useDeleteFollow';
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
    const deleteFollow = useDeleteFollow();

    const handleCreateFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createFollowInputValue: createFollowInput = {
                followeeId: user.id,
            };
            createFollow.mutate(createFollowInputValue);
        },
        [user, createFollow]
    );

    const handleDeleteFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const deleteFollowInputValue: deleteFollowInput = {
                followeeId: user.id,
            };
            deleteFollow.mutate(deleteFollowInputValue);
        },
        [user, deleteFollow]
    );

    return (
        <>
            {createFollow.isLoading && <Requesting />}
            <div className={styles.userInfo}>
                <div className={styles.imageWrapper}>
                    <div>
                        <Image src="/123.png" alt="profile" layout="fill" />
                    </div>
                </div>
                <div className={styles.gridWrapper}>
                    <div className={styles.infoWrapper}>
                        <h1>{user.nickname}</h1>
                        <p>{user.grade}</p>
                    </div>
                    <div className={styles.buttonWrapper}>
                        {loginUserId == user.id ? (
                            <></>
                        ) : user.followStatus ? (
                            <>
                                <Button
                                    onClick={() =>
                                        window.open('/message?tabs=writing', '_blank', 'width=600 height=600')
                                    }
                                >
                                    쪽지
                                </Button>
                                <Button onClick={handleDeleteFollowClick}>언팔로우</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => window.open('/message/write', '_blank', 'width=600 height=600')}>
                                    쪽지
                                </Button>
                                <Button onClick={handleCreateFollowClick}>팔로우</Button>
                            </>
                        )}
                    </div>
                    <div>경험치 랭킹</div>
                    <InfoTable user={user} />
                </div>
                <div className={styles.intro}>소개말</div>
            </div>
        </>
    );
};

export default UserInfo;
