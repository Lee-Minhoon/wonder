import { createCommentInput } from 'container/Content/Comment';
import { AxiosService } from '../defaultAxiosService';

const createContent = async (input: createCommentInput) => {
    if (!validate(input)) return;

    try {
        var { data } = await AxiosService.instance.post('comment', null, {
            params: {
                post: input.post,
                content: input.content,
            },
        });
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

const validate = (input: createCommentInput) => {
    if (!input.content) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default createContent;
