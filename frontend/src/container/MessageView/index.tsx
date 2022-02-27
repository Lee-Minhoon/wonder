// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadMessage, { readMessageInput } from 'hooks/message/useReadMessage';
import * as dateService from 'service/format';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import Button from 'components/Button';
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';
import { messagePagePath } from 'pages/message';

const MessageView = () => {
    const router = useRouter();
    const loginUserId = useTypedSelector((state) => state.user.userId);

    const readMessageInputValue: readMessageInput = {
        messageId: router.query?.id,
    };
    const {
        data: messageData,
        error: messageError,
        isLoading: messageIsLoading,
        isSuccess: messageIsSuccess,
        isError: messageIsError,
    } = useReadMessage(readMessageInputValue);

    const sentAt = messageData?.data?.sentAt ? dateService.formatDateTime(new Date(messageData.data.sentAt)) : null;
    const receivedAt = messageData?.data?.receivedAt
        ? dateService.formatDateTime(new Date(messageData.data.receivedAt))
        : null;

    return (
        <>
            {messageIsLoading && <Loading />}
            {messageIsError && <p>{messageError.response.data.message}</p>}
            {messageIsSuccess && (
                <article className={styles.messageView}>
                    <header>
                        <div>
                            <span>보낸이</span>
                            <span>{messageData.data.sender}</span>
                            <span>{sentAt}</span>
                        </div>
                        <div>
                            <span>받는이</span>
                            <span>{messageData.data.recipient}</span>
                            <span>{receivedAt}</span>
                        </div>
                        <div>{messageData.data.title}</div>
                    </header>
                    <article dangerouslySetInnerHTML={{ __html: messageData.data.content }} />
                    <div className={styles.buttonWrapper}>
                        {loginUserId != messageData.data.senderId && (
                            <Button
                                onClick={() =>
                                    router.push({
                                        pathname: `${messagePagePath}`,
                                        query: { tabs: 'writing', target: `${messageData.data.sender}` },
                                    })
                                }
                            >
                                답장하기
                            </Button>
                        )}
                        <Button onClick={() => router.push(router.query.redirect.toString())}>목록으로</Button>
                    </div>
                </article>
            )}
        </>
    );
};

export default MessageView;
