// import package, library
import Link from 'next/link';

// import utilities

// import components
import SubMenu from './SubMenu';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const GNB = () => {
    return (
        <nav className={styles.gnb}>
            <ul className={styles.mainMenu}>
                {category.map((main) => (
                    <li className={styles.mainMenuList} key={main.id}>
                        <Link
                            href={{ pathname: '/board/list', query: { main: main.url, sub: 'all', page: 1, size: 20 } }}
                        >
                            <a>{main.title}</a>
                        </Link>
                        <SubMenu main={main} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default GNB;
