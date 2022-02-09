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
            console.log('글 삭제 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push('/auth/login');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('글 삭제 성공', data);
            router.push(router.query.redirect.toString());
        },
    });
};

export default useDeletePost;
