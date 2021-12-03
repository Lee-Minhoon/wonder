import axios from 'axios';
import { loginInput } from 'components/layout/Login';
import { AxiosService } from './defaultAxiosService';

const login = async (input: loginInput) => {
    if (!validate(input)) return;

    try {
        var { data } = await AxiosService.instance.post('user/login', null, {
            params: {
                id: input.id,
                password: input.password,
            },
        });
    } catch (err) {
        console.log(err);
    }

    // const token = data.token;
    // console.log(token);
    // AxiosService.addHeaderToken(token);
    return data;
};

const validate = (input: loginInput) => {
    if (!input.id || !input.password) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default login;
