import { useQuery } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { readAllCommentInput } from 'container/Content/Comment';

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
