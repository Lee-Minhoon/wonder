// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';

const InfoTabs = () => {
    const router = useRouter();
    const tabs = [
        { id: 1, value: 'overview', text: 'Overview', query: {} },
        { id: 2, value: 'followers', text: '팔로워', query: { page: 1, size: 20 } },
        { id: 3, value: 'followees', text: '팔로잉', query: { page: 1, size: 20 } },
        { id: 4, value: 'posts', text: '게시글', query: { title: '', page: 1, size: 20 } },
    ];

    return (
        <nav className={styles.infoTabs}>
            <ul>
                {tabs.map((item) => (
                    <LinkList
                        key={item.id}
                        pathname={router.pathname}
                        query={{ id: router.query.id, tabs: item.value, ...item.query }}
                        text={item.text}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default InfoTabs;
