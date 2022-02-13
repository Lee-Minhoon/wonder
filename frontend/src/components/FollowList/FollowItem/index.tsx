// import package, library
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// import utilities
import useCreateFollow, { createFollowInput } from 'hooks/follow/useCreateFollow';
import useDeleteFollow, { deleteFollowInput } from 'hooks/follow/useDeleteFollow';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const FollowItem = (props) => {
    const router = useRouter();
    const loginUserId = useTypedSelector((state) => state.user.userId);
    const createFollow = useCreateFollow();
    const deleteFollow = useDeleteFollow();
    // const date = new Intl.DateTimeFormat('ko-KR', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    // }).format(new Date(props.createdAt));

    const handleCreateFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createFollowInputValue: createFollowInput = {
                followeeId: props.id,
            };
            createFollow.mutate(createFollowInputValue);
        },
        [props.id, createFollow]
    );

    const handleDeleteFollowClick = useCallback(
        async (e) => {
            e.preventDefault();
            const deleteFollowInputValue: deleteFollowInput = {
                followeeId: props.id,
            };
            deleteFollow.mutate(deleteFollowInputValue);
        },
        [props.id, deleteFollow]
    );

    return (
        <li className={styles.followItem}>
            <div className={styles.flexWrapper}>
                <div className={styles.imageWrapper}>
                    <Image src="/123.png" alt="followProfile" layout="fill" />
                </div>
                <div className={styles.infoWrapper}>
                    <Link href={{ pathname: `/user/${props.id}`, query: { tabs: 'overview' } }}>
                        <a>{props.nickname}</a>
                    </Link>
                    <p>test</p>
                </div>
                <div className={styles.buttonWrapper}>
                    {loginUserId == props.id ? (
                        <></>
                    ) : props.followStatus ? (
                        <>
                            <Button onClick={handleDeleteFollowClick}>언팔로우</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleCreateFollowClick}>팔로우</Button>
                        </>
                    )}
                </div>
            </div>
            {/* <p dangerouslySetInnerHTML={{ __html: props.content }} /> */}
        </li>
    );
};

export default FollowItem;
