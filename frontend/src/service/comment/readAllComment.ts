import { AxiosService } from '../defaultAxiosService';
import { readAllCommentInput } from 'container/Content/Comment';

const readAllComment = async (input: readAllCommentInput) => {
    try {
        var { data } = await AxiosService.instance.get('comment', {
            params: {
                post: input.post,
                page: input.page,
                size: input.size,
            },
        });
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

export default readAllComment;
