import { AxiosService } from '../defaultAxiosService';
import { readPostInput } from 'container/Content/Post';

const readAllPost = async (input: readPostInput) => {
    try {
        var { data } = await AxiosService.instance.get(`post/${input.id}`);
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

export default readAllPost;
