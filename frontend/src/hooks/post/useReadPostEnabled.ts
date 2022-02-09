// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

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
    const { data } = await AxiosService.instance.get(`posts/${input.id}`);
    return data;
};

const useReadPostEnabled = (input: readPostInput) => {
    const response = useQuery(['read_post', input], async () => readPost(input), { enabled: false });
    return response;
};

export default useReadPostEnabled;
