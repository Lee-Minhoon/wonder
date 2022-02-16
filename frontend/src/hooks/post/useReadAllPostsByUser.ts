// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllPostsByUserInput {
    user: number;
    title: string;
    page: number;
    size: number;
}

const readAllPostsByUser = async (input: readAllPostsByUserInput) => {
    const { data } = await DefaultAxiosService.instance.get(`users/${input.user}/posts`, {
        params: {
            title: input.title,
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllPostsByUser = (input: readAllPostsByUserInput) => {
    const response = useQuery(['read_all_posts_by_user', input], async () => readAllPostsByUser(input));
    return response;
};

export default useReadAllPostsByUser;
