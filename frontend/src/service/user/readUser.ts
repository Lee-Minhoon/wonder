import { AxiosService } from '../defaultAxiosService';
import { readUserInput } from 'container/User';

export interface readUserResponse {
    id: number;
    email: string;
    nickname: string;
    grade: string;
    role: string;
}

const readUser = async (input: readUserInput) => {
    try {
        if (!input) return;

        const { data } = await AxiosService.instance.get(`user/${input.id}`);
        return data;
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }
};

export default readUser;
