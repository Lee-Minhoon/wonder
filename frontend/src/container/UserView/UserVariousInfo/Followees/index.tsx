// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllFollowees, { readAllFolloweesInput } from 'hooks/user/useReadAllFollowees';

// import components
import FollowList from 'components/FollowList';
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';

const FolloweesTab = () => {
    const router = useRouter();

    const readAllFolloweesInputValue: readAllFolloweesInput = {
        followerId: parseInt(router.query.id.toString()),
        page: parseInt(router.query.page as string) - 1,
        size: parseInt(router.query.size as string),
    };
    const {
        data: followeesData,
        error: followeesError,
        isLoading: followeesIsLoading,
        isError: followeesIsError,
        isSuccess: followeesIsSuccess,
    } = useReadAllFollowees(readAllFolloweesInputValue);

    return (
        <>
            {followeesIsLoading && <Loading />}
            {followeesIsError && <p>{followeesError.response.data.message}</p>}
            {followeesIsSuccess && (
                <div className={styles.followeesTab}>
                    <FollowList users={followeesData.data} />
                </div>
            )}
        </>
    );
};

export default FolloweesTab;
