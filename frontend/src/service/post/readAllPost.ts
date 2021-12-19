import { AxiosService } from '../defaultAxiosService';
import { readAllPostInput } from 'container/Board/PostList';

const readAllPost = async (input: readAllPostInput) => {
    try {
        var { data } = await AxiosService.instance.get('post', {
            params: {
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

export default readAllPost;
