import { useMutation, useQuery } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { readPostInput } from 'container/Content/Post';
import { loginInput } from 'container/LoginForm';

const login = async (input: loginInput) => {
    const { data } = await AxiosService.instance.post('auth/login', {
        email: input.email,
        password: input.password,
    });
    return data;
};

const useLogin = () => {
    return useMutation((input: loginInput) => login(input));
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

export default useLogin;
