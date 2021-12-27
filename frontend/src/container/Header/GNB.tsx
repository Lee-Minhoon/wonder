import Link from 'next/link';

// import constants
import category from 'constants/category';

// import styles
import styles from './styles.module.scss';

const GNB = () => {
    return (
        <nav className={styles.gnb}>
            <ul>
                {category.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={{ pathname: '/board/list', query: { main: item.url, sub: 'all', page: 0, size: 20 } }}
                        >
                            <a>{item.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default GNB;
