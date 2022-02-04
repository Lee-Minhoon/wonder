// import package, library
import { useMutation } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface loginInput {
    email: any;
    password: any;
}

const login = async (input: loginInput) => {
    const { data } = await AxiosService.instance.post('auth/login', {
        email: input.email,
        password: input.password,
    });
    return data;
};

const useLogin = () => {
    return useMutation((input: loginInput) => login(input), {
        onMutate: (variables) => {
            console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(error.response);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            AxiosService.addHeaderToken(data.data.token);
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
