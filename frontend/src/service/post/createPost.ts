import { createPostInput } from 'domain/Writing';
import { AxiosService } from '../defaultAxiosService';

const createPost = async (input: createPostInput) => {
    if (!validate(input)) return;

    try {
        var { data } = await AxiosService.instance.post('post', null, {
            params: {
                title: input.title,
            },
        });
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

const validate = (input: createPostInput) => {
    if (!input.title) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default createPost;
