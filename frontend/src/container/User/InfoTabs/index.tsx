// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const InfoTabs = () => {
    const router = useRouter();
    const tabs = [
        { id: 1, value: 'overview', text: 'Overview', query: {} },
        { id: 2, value: 'followers', text: '팔로워', query: { page: 1, size: 20 } },
        { id: 3, value: 'followees', text: '팔로잉', query: { page: 1, size: 20 } },
        { id: 4, value: 'posts', text: '쓴 게시글', query: { title: '', page: 1, size: 20 } },
        { id: 5, value: 'received', text: '받은쪽지', query: { page: 1, size: 20 } },
        { id: 6, value: 'sent', text: '보낸쪽지', query: { page: 1, size: 20 } },
    ];

    return (
        <nav className={styles.infoTabs}>
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

export default InfoTabs;
