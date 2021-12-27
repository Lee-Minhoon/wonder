import { useSelector } from 'react-redux';
import Link from 'next/link';

// import constants
import category from 'constants/category';

// import components
import BoardTitle from 'components/BoardTitle';

// import styles
import styles from './styles.module.scss';
import useCategory from 'hooks/useCategory';

const LNB = () => {
    const category = useCategory();
    const list = category.main.sub.map((item) => (
        <li key={item.id}>
            <Link href={{ pathname: '/board/list', query: { main: item.url, sub: 'all', page: 0, size: 20 } }}>
                <a>{item.title}</a>
            </Link>
        </li>
    ));

    return (
        <nav className={styles.lnb}>
            <BoardTitle title={category.main.title} url={category.main.url} />
            <ul>{list}</ul>
        </nav>
    );
};

export default LNB;
