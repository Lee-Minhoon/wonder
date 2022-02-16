// import package, library
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface deleteSentMessagesInput {
    messages: any;
}

const deleteSentMessages = async (input: deleteSentMessagesInput) => {
    const { data } = await DefaultAxiosService.instance.delete(`sentMessages/${input.messages}`);
    return data;
};

const useDeleteSentMessages = () => {
    const router = useRouter();
    return useMutation((input: deleteSentMessagesInput) => deleteSentMessages(input), {
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

export default useDeleteSentMessages;
