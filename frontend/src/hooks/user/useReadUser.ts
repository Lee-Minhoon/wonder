import { useQuery } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { readUserInput } from 'container/User';

export interface readUserResponse {
    id: number;
    email: string;
    nickname: string;
    grade: string;
    role: string;
}

export const readUser = async (input: readUserInput) => {
    const { data } = await AxiosService.instance.get(`users/${input.id}`);
    return data;
};

const useReadUser = (input: readUserInput) => {
    const response = useQuery(['read_user', input], async () => readUser(input));
    return response;
};

export default useReadUser;
