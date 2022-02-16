// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import utilities

// import components
import BasicInfoModify from './BasicInfoModify';

// import etc
import styles from './styles.module.scss';
import { settingPagePath } from 'pages/setting';

const Setting = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('');

    const tabs = [
        { id: 1, value: 'basic', text: '기본 정보 수정' },
        { id: 2, value: 'secession', text: '회원 탈퇴' },
    ];

    useEffect(() => {
        setSelectedTab(router.query?.tabs?.toString());
    }, [router.query?.tabs]);

    return (
        <div className={styles.setting}>
            <div className={styles.settingMenu}>
                <nav>
                    <ul>
                        {tabs.map((item) => (
                            <li key={item.id}>
                                <Link href={{ pathname: `${settingPagePath}`, query: { tabs: item.value } }}>
                                    <a>{item.text}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={styles.settingView}>{selectedTab == 'basic' && <BasicInfoModify />}</div>
        </div>
    );
};

export default Setting;
