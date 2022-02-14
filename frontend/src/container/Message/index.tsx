// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities

// import components
import MessageWriting from './MessageWriting/index';
import ReceivedMessages from './ReceivedMessages';
import SentMessages from './SentMessages';
import Divider from 'components/Divider';
import Tabs from 'components/Tabs';

// import etc
import styles from './styles.module.scss';

const Message = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('');

    const tabs = [
        { id: 1, value: 'received', text: '받은 쪽지', query: { page: 1 } },
        { id: 2, value: 'sent', text: '보낸 쪽지', query: { page: 1 } },
        { id: 3, value: 'writing', text: '쪽지 작성', query: {} },
    ];

    useEffect(() => {
        setSelectedTab(router.query?.tabs?.toString());
    }, [router.query?.tabs]);

    return (
        <div className={styles.message}>
            <Tabs tabs={tabs} />
            <Divider />
            {selectedTab == 'received' && <ReceivedMessages />}
            {selectedTab == 'sent' && <SentMessages />}
            {selectedTab == 'writing' && <MessageWriting />}
        </div>
    );
};

export default Message;
