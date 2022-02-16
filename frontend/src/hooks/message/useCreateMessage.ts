// import package, library
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createMessageInput {
    recipientNickname: string;
    title: string;
    content: string;
}

const createMessage = async (input: createMessageInput) => {
    const { data } = await DefaultAxiosService.instance.post('messages', {
        recipientNickname: input.recipientNickname,
        title: input.title,
        content: input.content,
    });
    return data;
};

const useCreateMessage = () => {
    const router = useRouter();
    return useMutation((input: createMessageInput) => createMessage(input), {
        onMutate: (variables) => {
            console.log('쪽지 발신 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push('/auth/login');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('쪽지 발신 성공', data);
        },
    });
};

const validate = (input: createMessageInput) => {
    if (!input.content) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default useCreateMessage;
