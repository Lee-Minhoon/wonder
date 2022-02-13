// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const Tabs = ({ tabs }) => {
    const router = useRouter();

    return (
        <nav className={styles.tabs}>
            <ul>
                {tabs.map((item) => {
                    let selected;
                    item.value === router.query?.tabs
                        ? (selected = { borderBottom: '2px solid #0099ff' })
                        : { borderBottom: 'none' };
                    return (
                        <li key={item.id} style={selected}>
                            <Link
                                href={{
                                    pathname: router.pathname,
                                    query: { id: router.query.id, tabs: item.value, ...item.query },
                                }}
                            >
                                <a>{item.text}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Tabs;
