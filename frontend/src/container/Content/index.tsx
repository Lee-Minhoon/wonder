// import package, library
import { useState } from 'react';
import { useRouter } from 'next/router';

// import utilities

// import components
import Post from './Post';
import Comment from './Comment';
import UserInfo from 'components/UserInfo';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Content = () => {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState(0);
    const [userId, setUserId] = useState(0);
    const main = category.find((item) => item.id === Math.floor(categoryId / 10));
    const sub = main?.sub.find((item) => item.id === categoryId);

    return (
        <div className={styles.content}>
            <div className={styles.topArea}>
                <h1 className={styles.title}>
                    {main?.title} – {sub?.title}
                </h1>
                <div className={styles.topButtonArea}>
                    <Button onClick={() => router.push(router.query.redirect.toString())}>목록으로</Button>
                </div>
            </div>
            <Post setCategoryId={setCategoryId} setUserId={setUserId} />
            <div className={styles.userInfo}>
                <UserInfo userId={userId} />
            </div>
            <Comment />
        </div>
    );
};

export default Content;
