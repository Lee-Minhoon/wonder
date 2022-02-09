// import package, library

// import utilities

// import components
import UserBasicInfo from './UserBasicInfo';
import UserVariousInfo from './UserVariousInfo';

// import etc
import styles from './styles.module.scss';

const User = () => {
    return (
        <div className={styles.user}>
            <UserBasicInfo />
            <UserVariousInfo />
        </div>
    );
};

export default User;
