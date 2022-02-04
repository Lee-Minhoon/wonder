// import package, library
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// import utilities

// import components
import InfoTabs from './InfoTabs';
import PostsTab from './PostsTab';

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
        </div>
    );
};

export default UserVariousInfo;
