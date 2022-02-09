// import package, library
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// import utilities

// import components
import InfoTabs from './InfoTabs';
import PostsTab from './PostsTab';
import FolloweesTab from './FolloweesTab';
import FollowersTab from './FollowersTab';
// import etc
import styles from './styles.module.scss';

const UserVariousInfo = () => {
    const router = useRouter();
    const [tabs, setTabs] = useState('');

    useEffect(() => {
        setTabs(router.query?.tabs.toString());
    }, [router.query?.tabs]);

    return (
        <div className={styles.userVariousInfo}>
            <InfoTabs />
            {tabs == 'posts' && <PostsTab />}
            {tabs == 'followers' && <FollowersTab />}
            {tabs == 'followees' && <FolloweesTab />}
        </div>
    );
};

export default UserVariousInfo;
