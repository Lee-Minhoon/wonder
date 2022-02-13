// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllSentMessages, { readAllSentMessagesInput } from 'hooks/message/useReadAllSentMessages';

// import components
import Pagination from 'components/Pagination';
import Loading from 'components/Loading';
import MessageList from 'components/MessageList';

// import etc
import styles from './styles.module.scss';

const SentMessages = () => {
    const router = useRouter();

    const readAllSentMessagesInputValue: readAllSentMessagesInput = {
        page: parseInt(router.query.page as string) - 1,
        size: 15,
    };
    const {
        data: messagesData,
        error: messagesError,
        isLoading: messagesIsLoading,
        isError: messagesIsError,
        isSuccess: messagesIsSucess,
    } = useReadAllSentMessages(readAllSentMessagesInputValue);

    return (
        <>
            {messagesIsLoading && <Loading />}
            {messagesIsError && <p>{messagesError.response.data.message}</p>}
            {messagesIsSucess && (
                <div className={styles.sentMessages}>
                    <MessageList messages={messagesData.data.data} isReceived={false} />
                    <footer className={styles.footer}>
                        <Pagination pages={messagesData.data.pages} />
                    </footer>
                </div>
            )}
        </>
    );
};

export default SentMessages;
