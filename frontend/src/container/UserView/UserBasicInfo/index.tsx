// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';
import useCreateFollow, { createFollowInput } from 'hooks/follow/useCreateFollow';
import useDeleteFollow, { deleteFollowInput } from 'hooks/follow/useDeleteFollow';

// import components
import InfoTable from './InfoTable';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import { messagePagePath } from 'pages/message';
import { settingPagePath } from 'pages/setting';

const UserBasicInfo = ({ user }) => {
    const router = useRouter();
    const userId = useTypedSelector((state) => state.user.userId);
    const createFollow = useCreateFollow();

    const handleCreateFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createFollowInputValue: createFollowInput = {
                followeeId: user.id,
            };
            createFollow.mutate(createFollowInputValue);
        },
        [user.id, createFollow]
    );
    const deleteFollow = useDeleteFollow();

    const handleDeleteFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const deleteFollowInputValue: deleteFollowInput = {
                followeeId: user.id,
            };
            deleteFollow.mutate(deleteFollowInputValue);
        },
        [user.id, deleteFollow]
    );

    return (
        <div className={styles.userBasicInfo}>
            <div className={styles.imageWrapper}>
                <figure>
                    <Image
                        src={user.profileImageUrl ? user.profileImageUrl : '/defaultProfile.png'}
                        alt="profile"
                        layout="fill"
                    />
                </figure>
            </div>
            <div className={styles.infoWrapper}>
                <h1>{user.nickname}</h1>
                <p>{user.grade}</p>
            </div>
            <div className={styles.buttonWrapper}>
                {userId == router.query?.id ? (
                    <Button onClick={() => router.push(`${settingPagePath}?tabs=basic`)}>설정</Button>
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
    );
};

export default UserBasicInfo;
