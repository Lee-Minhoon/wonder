// import package, library
import MessageItem from './MessageItem';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const MessageList = ({ messages, isReceived, allIsChecked, isChecked, handleAllCheckClick, handleCheckClick }) => {
    return (
        <table className={styles.messageList} cellSpacing="0">
            <colgroup>
                <col style={{ width: '40px' }} />
                <col style={{ width: '120px' }} />
                <col />
                <col style={{ width: '100px' }} />
                <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={allIsChecked}
                            onChange={(e) => handleAllCheckClick(e.target.checked)}
                        ></input>
                    </th>
                    {isReceived ? <th>보낸이</th> : <th>받는이</th>}
                    <th>제목</th>
                    <th>날짜</th>
                    <th>열람</th>
                </tr>
            </thead>
            <tbody>
                {isReceived
                    ? messages.map((item, index) => (
                          <MessageItem
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              senderId={item.senderId}
                              sender={item.sender}
                              senderProfileImageUrl={item.senderProfileImageUrl}
                              sentAt={item.sentAt}
                              receivedAt={item.receivedAt}
                              isReceived={isReceived}
                              isChecked={isChecked[index]}
                              index={index}
                              handleCheckClick={handleCheckClick}
                          />
                      ))
                    : messages.map((item, index) => (
                          <MessageItem
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              recipientId={item.recipientId}
                              recipient={item.recipient}
                              recipientProfileImageUrl={item.recipientProfileImageUrl}
                              sentAt={item.sentAt}
                              receivedAt={item.receivedAt}
                              isReceived={isReceived}
                              isChecked={isChecked[index]}
                              index={index}
                              handleCheckClick={handleCheckClick}
                          />
                      ))}
            </tbody>
        </table>
    );
};

export default MessageList;
