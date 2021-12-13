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
        console.log(err.response.data);
        alert(err.response.data.message);
    }

    AxiosService.addHeaderToken(data.data.token);

    return data;
};

const validate = (input: loginInput) => {
    if (!input.email || !input.password) {
        alert('빈 칸이 있습니다.');
        return false;
    } else if (input.password.length < 8) {
        alert('비밀번호를 8자 이상 입력하세요.');
        return false;
    }
    return true;
};

export default login;
