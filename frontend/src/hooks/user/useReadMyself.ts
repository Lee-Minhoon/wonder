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

export const readMyself = async () => {
    const { data } = await AxiosService.instance.get('users/me');
    return data;
};

const useReadMyself = () => {
    const response = useQuery(['read_myself'], async () => readMyself(), { enabled: false });
    return response;
};

export default useReadMyself;
