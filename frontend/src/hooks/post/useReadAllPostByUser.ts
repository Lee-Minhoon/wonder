import { useQuery } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { readAllPostInput } from 'container/Board';

const readAllPostByUser = async (input: readAllPostInput) => {
    const { data } = await AxiosService.instance.get(`users/${input.id}/posts`, {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllPostByUser = (input: readAllPostInput) => {
    const response = useQuery(['read_all_post_by_user', input], async () => readAllPostByUser(input));
    return response;
};

export default useReadAllPostByUser;
