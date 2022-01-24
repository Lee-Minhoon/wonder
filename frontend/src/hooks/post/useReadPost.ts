// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc
import { readPostInput } from 'container/Content/Post';

export interface readUserResponse {
    id: number;
    email: string;
    nickname: string;
    grade: string;
    role: string;
}

const readPost = async (input: readPostInput) => {
    const { data } = await AxiosService.instance.get(`posts/${input.id}`);
    return data;
};

const useReadPost = (input: readPostInput) => {
    const response = useQuery(['read_post', input], async () => readPost(input));
    return response;
};

export default useReadPost;
