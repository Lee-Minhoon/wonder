// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllSentMessages, { readAllSentMessagesInput } from 'hooks/message/useReadAllSentMessages';
import useDeleteMessages, { deleteMessagesInput } from 'hooks/message/useDeleteMessages';

// import components
import Button from 'components/Button';
import Loading from 'components/Loading';
import MessageList from 'components/MessageList';
import Pagination from 'components/Pagination';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const getMessagesParams = (messages, checks) => {
    const array = [];
    messages.forEach((item, index) => {
        if (checks[index]) {
            array.push(item.id);
        }
    });
    return array;
};

const SentMessages = () => {
    const router = useRouter();

    const [checks, setChecks] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const deleteMessages = useDeleteMessages();

    const handleCheckClick = (index, value) => {
        const newCheck = checks.map((item, i) => (i === index ? value : item));
        setChecks(newCheck);
    };

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

    const handleDeleteClick = useCallback(
        (e) => {
            e.preventDefault();
            if (confirm('삭제하시겠습니까?')) {
                const deleteMessagesInputValue: deleteMessagesInput = {
                    messages: getMessagesParams(messagesData.data.data, checks),
                };
                deleteMessages.mutate(deleteMessagesInputValue);
            } else {
                return;
            }
        },
        [checks, deleteMessages, messagesData?.data?.data]
    );

    useEffect(() => {
        if (deleteMessages.data && deleteMessages.isSuccess) {
            alert('선택한 쪽지를 삭제 하였습니다.');
        }
    }, [deleteMessages.data, deleteMessages.isSuccess]);

    return (
        <>
            {deleteMessages.isLoading && <Requesting />}
            {messagesIsLoading && <Loading />}
            {messagesIsError && <p>{messagesError.response.data.message}</p>}
            {messagesIsSucess && (
                <div className={styles.sentMessages}>
                    <MessageList
                        messages={messagesData.data.data}
                        isReceived={false}
                        handleCheckClick={handleCheckClick}
                    />
                    <footer className={styles.footer}>
                        <Button onClick={handleDeleteClick}>선택 쪽지 삭제</Button>
                        <Pagination pages={messagesData.data.pages} />
                    </footer>
                </div>
            )}
        </>
    );
};

export default SentMessages;
