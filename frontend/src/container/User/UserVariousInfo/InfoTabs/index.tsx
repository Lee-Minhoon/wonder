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
        { id: 1, value: 'overview', text: 'Overview' },
        { id: 2, value: 'followers', text: '팔로워' },
        { id: 3, value: 'followings', text: '팔로잉' },
        { id: 4, value: 'posts', text: '게시글' },
    ];

    return (
        <nav className={styles.infoTabs}>
            <ul className={styles.tabsList}>
                {tabs.map((item) =>
                    item.id != 4 ? (
                        <LinkList
                            key={item.id}
                            pathname={router.pathname}
                            query={{ id: router.query.id, tabs: item.value }}
                            text={item.text}
                        />
                    ) : (
                        <LinkList
                            key={item.id}
                            pathname={router.pathname}
                            query={{ id: router.query.id, tabs: item.value, title: '', page: 1, size: 20 }}
                            text={item.text}
                        />
                    )
                )}
            </ul>
        </nav>
    );
};

export default InfoTabs;
