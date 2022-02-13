// import package, library
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface deleteFollowInput {
    followeeId: any;
}

const deleteFollow = async (input: deleteFollowInput) => {
    const { data } = await AxiosService.instance.delete(`follow/${input.followeeId}`);
    return data;
};

const useDeleteFollow = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation((input: deleteFollowInput) => deleteFollow(input), {
        onMutate: (variables) => {
            console.log('언팔로우 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push('/auth/login');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('언팔로우 성공', data);
            queryClient.invalidateQueries('read_user');
            queryClient.invalidateQueries('read_all_followers');
            queryClient.invalidateQueries('read_all_followees');
        },
    });
};

export default useDeleteFollow;
