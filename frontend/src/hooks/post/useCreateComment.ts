import { useMutation, useQueryClient } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { createPostInput } from 'container/Writing';
import { useRouter } from 'next/router';
import { createCommentInput } from 'container/Content/Comment';

const createComment = async (input: createCommentInput) => {
    const { data } = await AxiosService.instance.post('comment', {
        post: input.post,
        content: input.content,
    });
    return data;
};

const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation((input: createCommentInput) => createComment(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
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