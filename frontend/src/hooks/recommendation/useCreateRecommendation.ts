// import package, library
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createRecommendationInput {
    postId: any;
}

const createRecommendation = async (input: createRecommendationInput) => {
    const { data } = await DefaultAxiosService.instance.post(`recommendation/${input.postId}`);
    return data;
};

const useCreateRecommendation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation((input: createRecommendationInput) => createRecommendation(input), {
        onMutate: (variables) => {
            console.log('추천 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.status == 401) {
                console.log('로그인 되지 않음');
                router.push('/auth/login');
            } else if (error.response.status == 409) {
                console.log('이미 추천 함');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('추천 성공..', data);
            queryClient.invalidateQueries('read_post');
        },
    });
};

export default useCreateRecommendation;
