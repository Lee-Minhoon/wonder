// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllCommentsInput {
    post: any;
    page: any;
    size: any;
}

const readAllComments = async (input: readAllCommentsInput) => {
    const { data } = await AxiosService.instance.get('comments', {
        params: {
            post: input.post,
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllComments = (input: readAllCommentsInput) => {
    const response = useQuery(['read_all_comments', input], async () => readAllComments(input));
    return response;
};

export default useReadAllComments;
