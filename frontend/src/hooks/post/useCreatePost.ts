// import package, library
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createPostInput {
    category: any;
    title: any;
    content: any;
}

const createPost = async (input: createPostInput) => {
    const { data } = await AxiosService.instance.post('posts', {
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
