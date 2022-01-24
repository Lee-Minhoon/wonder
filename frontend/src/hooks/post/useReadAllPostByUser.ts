// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc
import { readAllPostByUserInput } from 'container/User';

const readAllPostByUser = async (input: readAllPostByUserInput) => {
    const { data } = await AxiosService.instance.get(`users/${input.user}/posts`, {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllPostByUser = (input: readAllPostByUserInput) => {
    const response = useQuery(['read_all_post_by_user', input], async () => readAllPostByUser(input));
    return response;
};

export default useReadAllPostByUser;
