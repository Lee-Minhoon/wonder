// import package, library

// import utilities

// import components
import UserBasicInfo from './UserBasicInfo';
import UserVariousInfo from './UserVariousInfo';
import Tabs from 'components/Tabs';

// import etc
import styles from './styles.module.scss';

const UserView = () => {
    const tabs = [
        { id: 1, value: 'overview', text: 'Overview', query: {} },
        { id: 2, value: 'followers', text: '팔로워', query: { page: 1, size: 20 } },
        { id: 3, value: 'followees', text: '팔로잉', query: { page: 1, size: 20 } },
        { id: 4, value: 'posts', text: '쓴 게시글', query: { title: '', page: 1, size: 20 } },
        { id: 5, value: 'received', text: '받은쪽지', query: { page: 1, size: 20 } },
        { id: 6, value: 'sent', text: '보낸쪽지', query: { page: 1, size: 20 } },
    ];

    return (
        <div className={styles.user}>
            <Tabs tabs={tabs} />
            <div className={styles.flexWrapper}>
                <UserBasicInfo />
                <UserVariousInfo />
            </div>
        </div>
    );
};

export default UserView;
