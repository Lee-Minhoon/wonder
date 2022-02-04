// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllPostInput {
    category: number;
    title: string;
    page: number;
    size: number;
}

const readAllPost = async (input: readAllPostInput) => {
    const { data } = await AxiosService.instance.get('posts', {
        params: {
            category: input.category,
            title: input.title,
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllPost = (input: readAllPostInput) => {
    const response = useQuery(['read_all_post', input], async () => readAllPost(input));
    return response;
};

export default useReadAllPost;
