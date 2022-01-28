// import package, library
import { useState } from 'react';
import { useRouter } from 'next/router';

// import utilities

// import components
import Post from './Post';
import Comment from './Comment';
import UserInfo from 'components/UserInfo';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Content = () => {
    const router = useRouter();
    const [user, setUser] = useState(0);
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                {main?.title} – {sub?.title}
            </h1>
            <Post setUser={setUser} />
            <div className={styles.userInfo}>
                <UserInfo userId={user} />
            </div>
            <Comment />
        </div>
    );
};

export default Content;
