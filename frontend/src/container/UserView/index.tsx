// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadUser, { readUserInput } from 'hooks/user/useReadUser';

// import components
import UserBasicInfo from './UserBasicInfo';
import UserVariousInfo from './UserVariousInfo';
import Divider from 'components/Divider';
import Loading from 'components/Loading';
import Tabs from 'components/Tabs';

// import etc
import styles from './styles.module.scss';

const UserView = () => {
    const router = useRouter();
    const tabs = [
        { id: 1, value: 'overview', text: 'Overview', query: { id: router.query?.id } },
        { id: 2, value: 'followers', text: '팔로워', query: { id: router.query?.id, page: 1, size: 20 } },
        { id: 3, value: 'followees', text: '팔로잉', query: { id: router.query?.id, page: 1, size: 20 } },
        { id: 4, value: 'posts', text: '쓴 게시글', query: { id: router.query?.id, title: '', page: 1, size: 20 } },
    ];

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
        <>
            {userIsLoading && <Loading />}
            {userIsError && <p>{userError.response.data?.message}</p>}
            {userIsSuccess && (
                <div className={styles.user}>
                    <div className={styles.tabsWrapper}>
                        <div className={styles.blank} />
                        <div className={styles.tabs}>
                            <Tabs tabs={tabs} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.flexWrapper}>
                        <UserBasicInfo user={userData.data} />
                        <UserVariousInfo user={userData.data} />
                    </div>
                </div>
            )}
        </>
    );
};

export default UserView;
