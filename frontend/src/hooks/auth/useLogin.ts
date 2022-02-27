// import package, library
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';
import { FormTypeAxiosService } from 'service/formTypeAxiosService';
import { login } from 'state/user/action';

// import components

// import etc

export interface loginInput {
    email: any;
    password: any;
}

const loginService = async (input: loginInput) => {
    const { data } = await DefaultAxiosService.instance.post('auth/login', {
        email: input.email,
        password: input.password,
    });
    return data;
};

const useLogin = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    return useMutation((input: loginInput) => loginService(input), {
        onMutate: (variables) => {
            console.log('로그인 시도 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 실패', error.response);
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('로그인 성공', data);
            const user = data?.data;
            dispatch(login(user?.id, user?.nickname));
            router.push(router.query?.redirect?.toString());
            DefaultAxiosService.addHeaderToken(data.data.token);
            FormTypeAxiosService.addHeaderToken(data.data.token);
        },
    });
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
