// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useReadAllSentMessages, { readAllSentMessagesInput } from 'hooks/message/useReadAllSentMessages';
import useDeleteSentMessages, { deleteSentMessagesInput } from 'hooks/message/useDeleteSentMessages';

// import components
import Button from 'components/Button';
import Loading from 'components/Loading';
import MessageList from 'components/MessageList';
import Pagination from 'components/Pagination';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const getMessagesParams = (messages, isChecked) => {
    const array = [];
    messages.forEach((item, index) => {
        if (isChecked[index]) {
            array.push(item.id);
        }
    });
    return array;
};

const SentMessages = () => {
    const router = useRouter();

    const [allIsChecked, setAllIsChecked] = useState(false);
    const [isChecked, setIsChecked] = useState(Array.from({ length: 15 }, () => false));

    const deleteMessages = useDeleteSentMessages();

    const handleCheckClick = (index, value) => {
        setIsChecked(isChecked.map((item, i) => (i === index ? value : item)));
    };

    const handleAllCheckClick = (value) => {
        setAllIsChecked(value);
        setIsChecked(Array.from({ length: 15 }, () => value));
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
                const deleteSentMessagesInputValue: deleteSentMessagesInput = {
                    messages: getMessagesParams(messagesData.data.data, isChecked),
                };
                deleteMessages.mutate(deleteSentMessagesInputValue);
            } else {
                return;
            }
        },
        [deleteMessages, isChecked, messagesData?.data?.data]
    );

    useEffect(() => {
        setAllIsChecked(false);
        setIsChecked(Array.from({ length: 15 }, () => false));
    }, [messagesData]);

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
                        isReceived={true}
                        allIsChecked={allIsChecked}
                        isChecked={isChecked}
                        handleAllCheckClick={handleAllCheckClick}
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
