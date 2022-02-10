// import package, library
import Link from 'next/link';
import { useRouter } from 'next/router';

// import utilities

// import components
import SubMenu from './SubMenu';

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';

const GNB = () => {
    const router = useRouter();
    return (
        <nav className={styles.gnb}>
            <ul className={styles.mainMenu}>
                {category.map((item) => {
                    let selected;
                    item.url === router.query?.main
                        ? (selected = { borderBottom: '2px solid #0099ff' })
                        : { borderBottom: 'none' };
                    return (
                        <li key={item.id} className={styles.mainMenuList} style={selected}>
                            <Link
                                href={{
                                    pathname: '/board/list',
                                    query: { main: item.url, sub: 'all', title: '', page: 1, size: 20 },
                                }}
                            >
                                <a>{item.title}</a>
                            </Link>
                            <SubMenu main={item} />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default GNB;
