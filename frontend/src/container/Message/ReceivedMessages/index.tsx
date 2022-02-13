// import package, library
import { useRouter } from 'next/router';

// import utilities
import useReadAllReceivedMessages, { readAllReceivedMessagesInput } from 'hooks/message/useReadAllReceivedMessages';

// import components
import Pagination from 'components/Pagination';
import MessageList from 'components/MessageList';
import Loading from 'components/Loading';

// import etc
import styles from './styles.module.scss';

const ReceivedMessages = () => {
    const router = useRouter();

    const readAllReceivedMessagesInputValue: readAllReceivedMessagesInput = {
        page: parseInt(router.query.page as string) - 1,
        size: 15,
    };
    const {
        data: messagesData,
        error: messagesError,
        isLoading: messagesIsLoading,
        isError: messagesIsError,
        isSuccess: messagesIsSucess,
    } = useReadAllReceivedMessages(readAllReceivedMessagesInputValue);

    return (
        <>
            {messagesIsLoading && <Loading />}
            {messagesIsError && <p>{messagesError.response.data.message}</p>}
            {messagesIsSucess && (
                <div className={styles.receivedMessages}>
                    <MessageList messages={messagesData.data.data} isReceived={true} />
                    <footer className={styles.footer}>
                        <Pagination pages={messagesData.data.pages} />
                    </footer>
                </div>
            )}
        </>
    );
};

export default ReceivedMessages;
