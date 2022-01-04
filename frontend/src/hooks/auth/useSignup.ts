import { useMutation } from 'react-query';
import { AxiosService } from '../../service/defaultAxiosService';
import { signupInput } from 'container/SignupForm';
import { useRouter } from 'next/router';

const signup = async (input: signupInput) => {
    const { data } = await AxiosService.instance.post('auth/signup', {
        email: input.email,
        password: input.password,
        nickname: input.nickname,
    });
    return data;
};

const useSignup = () => {
    const router = useRouter();
    return useMutation((input: signupInput) => signup(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            router.push('/');
        },
    });
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

export default useSignup;
