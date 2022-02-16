// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// import utilities
import { messageViewPagePath } from 'pages/message/[id]';
import * as dateService from 'service/format';

// import components

// import etc
import styles from './styles.module.scss';

const MessageItem = (props) => {
    const router = useRouter();

    const sentAt = dateService.isToday(new Date(props.sentAt))
        ? dateService.formatTime(new Date(props.sentAt))
        : dateService.formatDate(new Date(props.sentAt));
    const receivedAt = props.receivedAt
        ? dateService.isToday(new Date(props.receivedAt))
            ? dateService.formatTime(new Date(props.receivedAt))
            : dateService.formatDate(new Date(props.receivedAt))
        : null;

    const title = (
        <Link
            href={{
                pathname: `${messageViewPagePath}/${props.id}`,
                query: { redirect: router.asPath },
            }}
        >
            <a>{props.title}</a>
        </Link>
    );

    return (
        <tr className={styles.messageItem}>
            <td>
                <input
                    type="checkbox"
                    checked={props.isChecked}
                    onChange={(e) => props.handleCheckClick(props.index, e.target.checked)}
                ></input>
            </td>
            <td>
                <div className={styles.writerWrapper}>
                    <span className={styles.imageWrapper}>
                        <span className={styles.image}>
                            <Image src="/123.png" alt="profile" layout="fill" />
                        </span>
                    </span>
                    {props.isReceived ? (
                        <Link href={{ pathname: `/user/${props.senderId}`, query: { tabs: 'overview' } }}>
                            <a>{props.sender}</a>
                        </Link>
                    ) : (
                        <Link href={{ pathname: `/user/${props.recipientId}`, query: { tabs: 'overview' } }}>
                            <a>{props.recipient}</a>
                        </Link>
                    )}
                </div>
            </td>
            {props.isReceived ? (
                props.receivedAt ? (
                    <td>{title}</td>
                ) : (
                    <td style={{ color: '#0099ff' }}>{title}</td>
                )
            ) : (
                <td>{title}</td>
            )}
            <td>{sentAt}</td>
            <td>{receivedAt}</td>
        </tr>
    );
};

export default MessageItem;
