import { useQuery } from 'react-query';
import { AxiosService } from './../service/defaultAxiosService';

export async function getReadUser(id) {
    const query = `user/${id}`;
    const { data } = await AxiosService.instance.get(query);
    return data;
}

export function useGetReadUser(id: any) {
    return useQuery(
        ['get_read_user', id],
        () => {
            if (id) return getReadUser(id);
        },
        {
            enabled: false,
        }
    );
}
