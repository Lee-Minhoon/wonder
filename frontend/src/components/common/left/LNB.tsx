import { useSelector } from 'react-redux';
import Link from 'next/link';

// import constants
import category from 'constants/category';

// import components
import BoardTitle from 'components/atoms/BoardTitle';

// import styles
import styles from './styles.module.scss';

const LNB = () => {
    const loc = useSelector((state) => state.category.main);
    const main = category.find((item) => item.url === loc);
    const lnb = main.sub.map((item) => (
        <li key={item.id}>
            <Link href={{ pathname: '/board/list', query: { main: main.url, sub: item.url } }}>
                <a>{item.title}</a>
            </Link>
        </li>
    ));

    return (
        <nav className={styles.lnb}>
            <BoardTitle title={main.title} url={main.url} />
            <ul>{lnb}</ul>
        </nav>
    );
};

export default LNB;
