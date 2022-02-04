// import package, library
import { useMutation, useQueryClient } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface createRecInput {
    postId: any;
}

const createRec = async (input: createRecInput) => {
    const { data } = await AxiosService.instance.post('recommendation', {
        postId: input.postId,
    });
    return data;
};

const useCreateRec = () => {
    const queryClient = useQueryClient();
    return useMutation((input: createRecInput) => createRec(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            queryClient.invalidateQueries('read_post');
        },
    });
};

export default useCreateRec;
