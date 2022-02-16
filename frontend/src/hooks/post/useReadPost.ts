// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readUserResponse {
    id: number;
    email: string;
    nickname: string;
    grade: string;
    role: string;
}

export interface readPostInput {
    id: any;
}

const readPost = async (input: readPostInput) => {
    const { data } = await DefaultAxiosService.instance.get(`posts/${input.id}`);
    return data;
};

const useReadPost = (input: readPostInput) => {
    const response = useQuery(['read_post', input], async () => readPost(input));
    return response;
};

export default useReadPost;
