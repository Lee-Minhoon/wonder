// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import LinkList from 'components/LinkList';
import BoardTitle from 'components/BoardTitle';

// import etc
import styles from '../styles.module.scss';
import category from 'constants/category';

const LNB = () => {
    const router = useRouter();
    const main = category.find((item) => item.url === router.query.main);

    return (
        <nav className={styles.lnb}>
            <BoardTitle title={main?.title} url={main?.url} />
            <ul>
                {main?.sub.map((item) => (
                    <LinkList
                        key={item.id}
                        pathname="/board/list"
                        query={{ ...router.query, sub: item.url, page: 1, size: 20 }}
                        text={item.title}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default LNB;
