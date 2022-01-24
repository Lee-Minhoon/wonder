// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Post from './Post';
import Comment from './Comment';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const Content = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);

    return (
        <div className={styles.view}>
            <header>
                <BoardTitle title={main?.title} url={main?.url} />
                <Divider />
            </header>
            <Post />
            <Comment />
        </div>
    );
};

export default Content;
