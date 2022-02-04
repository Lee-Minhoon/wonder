// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllCommentInput {
    post: any;
    page: any;
    size: any;
}

const readAllComment = async (input: readAllCommentInput) => {
    const { data } = await AxiosService.instance.get('comments', {
        params: {
            post: input.post,
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllComment = (input: readAllCommentInput) => {
    const response = useQuery(['read_all_comment', input], async () => readAllComment(input));
    return response;
};

export default useReadAllComment;
