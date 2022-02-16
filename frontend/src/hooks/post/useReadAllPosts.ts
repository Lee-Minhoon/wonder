// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllPostsInput {
    category: number;
    title: string;
    page: number;
    size: number;
}

const readAllPosts = async (input: readAllPostsInput) => {
    const { data } = await DefaultAxiosService.instance.get('posts', {
        params: {
            category: input.category,
            title: input.title,
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllPosts = (input: readAllPostsInput) => {
    const response = useQuery(['read_all_posts', input], async () => readAllPosts(input));
    return response;
};

export default useReadAllPosts;
