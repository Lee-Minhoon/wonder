// import package, library
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// import utilities
import useCreateMessage, { createMessageInput } from 'hooks/message/useCreateMessage';
import useInputWithSetValue from 'hooks/useInputWithSetValue';
import useInput from 'hooks/useInput';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import Button from 'components/Button';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const MessageWriting = () => {
    const router = useRouter();
    const createMessage = useCreateMessage();
    const userNickname = useTypedSelector((state) => state.user.userNickname);
    const recipientNickname = useInputWithSetValue('');
    const title = useInput('');
    const content = useInput('');

    const handleCreateMessageSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const createMessageInputValue: createMessageInput = {
                recipientNickname: recipientNickname.value,
                title: title.value,
                content: content.value,
            };
            createMessage.mutate(createMessageInputValue);
        },
        [recipientNickname.value, title.value, content.value, createMessage]
    );

    useEffect(() => {
        if (router.query?.target) {
            recipientNickname.setValue(router.query?.target);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query?.target]);

    useEffect(() => {
        if (createMessage.data && createMessage.isSuccess) {
            alert('쪽지를 전송 하였습니다.');
        }
    }, [createMessage.data, createMessage.isSuccess]);

    return (
        <>
            {createMessage.isLoading && <Requesting />}
            <div className={styles.messageWriting}>
                <form>
                    <div>
                        <label>보내는 사람</label>
                        <em>{userNickname}</em>
                    </div>
                    <div className={styles.recipientWrapper}>
                        <label>받는 사람</label>
                        <input type="text" placeholder="닉네임을 입력하세요." {...recipientNickname} />
                    </div>
                    <div className={styles.titleWrapper}>
                        <input type="text" placeholder="제목을 입력하세요." {...title} />
                    </div>
                    <textarea placeholder="내용을 입력하세요." {...content} />
                    <div className={styles.buttonWrapper}>
                        <Button onClick={handleCreateMessageSubmit}>쪽지 보내기</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MessageWriting;
