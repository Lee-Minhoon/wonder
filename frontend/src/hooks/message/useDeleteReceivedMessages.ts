// import package, library
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface deleteReceivedMessagesInput {
    messages: any;
}

const deleteReceivedMessages = async (input: deleteReceivedMessagesInput) => {
    const { data } = await DefaultAxiosService.instance.delete(`receivedMessages/${input.messages}`);
    return data;
};

const useDeleteReceivedMessages = () => {
    const router = useRouter();
    return useMutation((input: deleteReceivedMessagesInput) => deleteReceivedMessages(input), {
        onMutate: (variables) => {
            console.log('메시지 삭제 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push('/auth/login');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('메시지 삭제 성공', data);
        },
    });
};

export default useDeleteReceivedMessages;
