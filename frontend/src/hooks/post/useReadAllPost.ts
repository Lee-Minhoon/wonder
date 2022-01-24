// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc
import { readAllPostInput } from 'container/Board';

const readAllPost = async (input: readAllPostInput) => {
    const { data } = await AxiosService.instance.get('posts', {
        params: {
            category: input.category,
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
