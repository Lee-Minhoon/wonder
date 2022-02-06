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

export const readMe = async () => {
    const { data } = await AxiosService.instance.get('users/me');
    return data;
};

const useReadMe = () => {
    const response = useQuery(['read_myself'], async () => readMe(), { enabled: false });
    return response;
};

export default useReadMe;
