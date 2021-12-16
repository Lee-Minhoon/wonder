import { signupInput } from 'domain/SignupForm';
import { AxiosService } from '../defaultAxiosService';

const signup = async (input: signupInput) => {
    if (!validate(input)) return;

    try {
        var { data } = await AxiosService.instance.post('user/signup', null, {
            params: {
                email: input.email,
                password: input.password,
                nickname: input.nickname,
            },
        });
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

const validate = (input: signupInput) => {
    if (!input.email || !input.password || !input.check || !input.nickname) {
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
