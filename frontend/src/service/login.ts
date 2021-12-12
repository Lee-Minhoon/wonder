import axios from 'axios';
import { loginInput } from 'components/layout/Login';
import { AxiosService } from './defaultAxiosService';

const login = async (input: loginInput) => {
    if (!validate(input)) return;

    try {
        var { data } = await AxiosService.instance.post('user/login', null, {
            params: {
                email: input.email,
                password: input.password,
            },
        });
    } catch (err) {
        console.log(err);
    }

    AxiosService.addHeaderToken(data);
    console.log(AxiosService.instance.defaults.headers.common.Authorization);
    return data;
};

const validate = (input: loginInput) => {
    if (!input.email || !input.password) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default login;
