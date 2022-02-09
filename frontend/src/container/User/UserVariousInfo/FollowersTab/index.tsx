// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllFollowers, { readAllFollowersInput } from 'hooks/user/useReadAllFollowers';

// import components
import Loading from 'components/Loading';
import FollowList from 'components/FollowList';

// import etc
import styles from './styles.module.scss';

const FollowersTab = () => {
    const router = useRouter();

    const readAllFollowersInputValue: readAllFollowersInput = {
        followeeId: parseInt(router.query.id.toString()),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const {
        data: followersData,
        error: followersError,
        isLoading: followersIsLoading,
        isError: followersIsError,
        isSuccess: followersIsSuccess,
    } = useReadAllFollowers(readAllFollowersInputValue);

    return (
        <>
            {followersIsLoading && <Loading />}
            {followersIsError && <p>{followersError.response.data.message}</p>}
            {followersIsSuccess && (
                <div className={styles.followersTab}>
                    <FollowList users={followersData.data} />
                </div>
            )}
        </>
    );
};

export default FollowersTab;
