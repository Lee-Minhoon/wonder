// import package, library
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface signupInput {
    email: any;
    password: any;
    check: any;
    nickname: any;
}

const signupService = async (input: signupInput) => {
    const { data } = await AxiosService.instance.post('auth/signup', {
        email: input.email,
        password: input.password,
        nickname: input.nickname,
    });
    return data;
};

const useSignup = () => {
    const router = useRouter();
    return useMutation((input: signupInput) => signupService(input), {
        onMutate: (variables) => {
            console.log('회원가입 시도 중..', variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log('회원가입 성공', data);
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
