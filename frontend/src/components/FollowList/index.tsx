// import package, library

// import utilities

// import components
import FollowItem from './FollowItem';

// import etc
import styles from './styles.module.scss';

const FollowList = ({ users }) => {
    return (
        <ul className={styles.followList}>
            {users.data.map((item) => (
                <FollowItem key={item.id} id={item.id} nickname={item.nickname} followStatus={item.followStatus} />
            ))}
        </ul>
    );
};

export default FollowList;
