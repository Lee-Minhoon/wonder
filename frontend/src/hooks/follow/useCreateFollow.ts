// import package, library
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
    const queryClient = useQueryClient();
    return useMutation((input: createFollowInput) => createFollow(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            // queryClient.invalidateQueries('read_post');
        },
    });
};

export default useCreateFollow;
