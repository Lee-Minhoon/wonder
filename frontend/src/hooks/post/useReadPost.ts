import { useQuery } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { readPostInput } from 'container/Content/Post';

export interface readUserResponse {
    id: number;
    email: string;
    nickname: string;
    grade: string;
    role: string;
}

const readPost = async (input: readPostInput) => {
    const { data } = await AxiosService.instance.get(`post/${input.id}`);
    return data;
};

const useReadPost = (input: readPostInput) => {
    const response = useQuery(['read_post', input], async () => readPost(input));
    return response;
};

export default useReadPost;
