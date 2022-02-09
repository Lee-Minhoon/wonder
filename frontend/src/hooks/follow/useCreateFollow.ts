// import package, library
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createFollowInput {
    followeeId: any;
}

const createFollow = async (input: createFollowInput) => {
    const { data } = await AxiosService.instance.post(`follow/${input.followeeId}`);
    return data;
};

const useCreateFollow = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation((input: createFollowInput) => createFollow(input), {
        onMutate: (variables) => {
            console.log('팔로우 중..', variables);
        },
        onError: (error, variables, context) => {
            const errorStatus = error.response.status;
            console.log(error.response);
            if (errorStatus == 400) {
                console.log('자기 자신은 팔로우 할 수 없음');
            } else if (errorStatus == 401) {
                console.log('로그인 되지 않음');
                router.push('/auth/login');
            } else if (errorStatus == 409) {
                console.log('이미 팔로우 함');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('팔로우 성공', data);
            queryClient.invalidateQueries('read_user');
        },
    });
};

export default useCreateFollow;
