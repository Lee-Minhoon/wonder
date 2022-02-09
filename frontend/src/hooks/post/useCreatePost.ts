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
            console.log('글 작성 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push({ pathname: '/auth/login', query: { redirect: router.asPath } });
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('글 작성 성공..', data);
            router.push({ pathname: `/board/${data.data}`, query: { redirect: router.query?.redirect } });
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
