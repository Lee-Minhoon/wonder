// import package, library
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface deletePostInput {
    id: any;
}

const deletePost = async (input: deletePostInput) => {
    const { data } = await AxiosService.instance.delete(`posts/${input.id}`);
    return data;
};

const useDeletePost = () => {
    const router = useRouter();
    return useMutation((input: deletePostInput) => deletePost(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            // router.push({ pathname: `/board/${data.data}`, query: { ...router.query } });
        },
    });
};

export default useDeletePost;
