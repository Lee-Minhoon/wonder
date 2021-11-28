import axios from 'axios';
import { signupInput } from 'components/layout/Signup';
import { AxiosService } from './defaultAxiosService';

const signup = async (input: signupInput) => {
    if (!validate(input)) return;

    const { data } = await AxiosService.instance.post('user/signup', null, {
        params: {
            id: input.id,
            password: input.password,
            nickname: input.nickname,
        },
    });

    // const token = data.token;
    // console.log(token);
    // AxiosService.addHeaderToken(token);
    return data;
};

const validate = (input: signupInput) => {
    if (!input.id || !input.password || !input.check || !input.nickname) {
        alert('빈 칸이 있습니다.');
        return false;
    } else if (input.password.length < 8) {
        alert('비밀번호를 8자 이상 입력하세요.');
        return false;
    } else if (input.password != input.check) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    return true;
};

export default signup;
