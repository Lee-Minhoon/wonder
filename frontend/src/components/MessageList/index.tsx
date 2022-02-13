// import package, library
import { useRouter } from 'next/router';
import MessageItem from './MessageItem';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const MessageList = ({ messages, isReceived }) => {
    const router = useRouter();

    return (
        <table className={styles.messageList} cellSpacing="0">
            <colgroup>
                <col style={{ width: '120px' }} />
                <col />
                <col style={{ width: '100px' }} />
                <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
                <tr>
                    {isReceived ? <th>보낸이</th> : <th>받는이</th>}
                    <th>제목</th>
                    <th>날짜</th>
                    <th>열람</th>
                </tr>
            </thead>
            <tbody>
                {isReceived
                    ? messages.map((item) => (
                          <MessageItem
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              senderId={item.senderId}
                              sender={item.sender}
                              sentAt={item.sentAt}
                              receivedAt={item.receivedAt}
                              isReceived={isReceived}
                          />
                      ))
                    : messages.map((item) => (
                          <MessageItem
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              recipientId={item.recipientId}
                              recipient={item.recipient}
                              sentAt={item.sentAt}
                              receivedAt={item.receivedAt}
                              isReceived={isReceived}
                          />
                      ))}
            </tbody>
        </table>
    );
};

export default MessageList;
