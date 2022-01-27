// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import Post from './Post';
import Comment from './Comment';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Content = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);
    const sub = main?.sub.find((item) => item.url === router.query.sub);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                {main.title} – {sub.title}
            </h1>
            <Post />
            <Comment />
        </div>
    );
};

export default Content;
