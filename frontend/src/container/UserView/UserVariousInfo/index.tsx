// import package, library
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// import utilities

// import components
import Followees from './Followees';
import Followers from './Followers';
import WrittenPosts from './WrittenPosts';

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
            {tabs == 'posts' && <WrittenPosts />}
            {tabs == 'followers' && <Followers />}
            {tabs == 'followees' && <Followees />}
        </div>
    );
};

export default UserVariousInfo;
