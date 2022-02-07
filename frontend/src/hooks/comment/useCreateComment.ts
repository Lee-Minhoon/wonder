// import package, library
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createCommentInput {
    postId: any;
    content: any;
}

const createComment = async (input: createCommentInput) => {
    const { data } = await AxiosService.instance.post('comments', {
        postId: input.postId,
        content: input.content,
    });
    return data;
};

const useCreateComment = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation((input: createCommentInput) => createComment(input), {
        onMutate: (variables) => {
            console.log('댓글 입력 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push('/auth/login');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('댓글 입력 성공', data);
            queryClient.invalidateQueries('read_all_comment');
        },
    });
};

const validate = (input: createCommentInput) => {
    if (!input.content) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default useCreateComment;
