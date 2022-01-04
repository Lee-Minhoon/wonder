import { useMutation } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { createPostInput } from 'container/Writing';
import { useRouter } from 'next/router';

const createPost = async (input: createPostInput) => {
    const { data } = await AxiosService.instance.post('post', {
        category: input.category,
        title: input.title,
        content: input.content,
    });
    return data;
};

const useCreatePost = () => {
    const router = useRouter();
    return useMutation((input: createPostInput) => createPost(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            router.push({ pathname: `/board/${data.data}`, query: { ...router.query } });
        },
    });
};

const validate = (input: createPostInput) => {
    if (!input.title) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default useCreatePost;
