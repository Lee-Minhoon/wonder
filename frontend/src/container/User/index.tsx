// import package, library

// import utilities

// import components
import InfoTabs from './InfoTabs';
import UserBasicInfo from './UserBasicInfo';
import UserVariousInfo from './UserVariousInfo';

// import etc
import styles from './styles.module.scss';

const User = () => {
    return (
        <div className={styles.user}>
            <InfoTabs />
            <div className={styles.flexWrapper}>
                <UserBasicInfo />
                <UserVariousInfo />
            </div>
        </div>
    );
};

export default User;
