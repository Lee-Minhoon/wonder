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
import { messagePagePath } from 'pages/message';

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
                        <Image
                            src={user.profileImageUrl ? user.profileImageUrl : '/defaultProfile.png'}
                            alt="profile"
                            layout="fill"
                        />
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
                                        window.open(
                                            `${messagePagePath}?tabs=writing&target=${user.nickname}`,
                                            '_blank',
                                            'width=600 height=800'
                                        )
                                    }
                                >
                                    쪽지
                                </Button>
                                <Button onClick={handleDeleteFollowClick}>언팔로우</Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() =>
                                        window.open(
                                            `${messagePagePath}?tabs=writing&target=${user.nickname}`,
                                            '_blank',
                                            'width=600 height=800'
                                        )
                                    }
                                >
                                    쪽지
                                </Button>
                                <Button onClick={handleCreateFollowClick}>팔로우</Button>
                            </>
                        )}
                    </div>
                    <div className={styles.expWrapper}>
                        <span>경험치 : {user.exp}</span>
                        <span>랭킹 : {user.rank}</span>
                    </div>
                    <InfoTable user={user} />
                </div>
                <div className={styles.intro}>{user.intro}</div>
            </div>
        </>
    );
};

export default UserInfo;
