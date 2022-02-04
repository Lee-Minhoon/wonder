// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllPostByUser, { readAllPostByUserInput } from 'hooks/post/useReadAllPostByUser';

// import components
import Loading from 'components/Loading';
import UserBasicInfo from './UserBasicInfo';
import UserVariousInfo from './UserVariousInfo';

// import etc
import styles from './styles.module.scss';

const User = () => {
    const router = useRouter();

    // const readAllPostInputValue: readAllPostByUserInput = {
    //     user: router.query.id,
    //     page: parseInt(router.query.page as string) - 1,
    //     size: parseInt(router.query.size as string),
    // };
    // const { data, error, isLoading, isError } = useReadAllPostByUser(readAllPostInputValue);

    // if (isLoading) {
    //     return <Loading />;
    // }
    // if (isError) {
    //     return <p>{error.response.data.message}</p>;
    // }

    // const handleClick = () => {
    //     router.push({
    //         pathname: '/board/write',
    //         query: { ...router.query },
    //     });
    // };

    // const handleChange = (e) => {
    //     router.push({
    //         pathname: router.pathname,
    //         query: { ...router.query, size: e.target.value },
    //     });
    // };

    // const posts = data.data;
    return (
        <div className={styles.user}>
            <UserBasicInfo />
            <UserVariousInfo />
        </div>
    );
};

export default User;
