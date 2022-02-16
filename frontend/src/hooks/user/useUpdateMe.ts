// import package, library
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

// import utilities
import { FormTypeAxiosService } from 'service/formTypeAxiosService';

// import components

// import etc

export interface updateMeInput {
    formData: FormData;
}

const updateMe = async (input: updateMeInput) => {
    const { data } = await FormTypeAxiosService.instance.put('users/me', input.formData);
    return data;
};

const useUpdateMe = () => {
    const router = useRouter();
    return useMutation((input: updateMeInput) => updateMe(input), {
        onMutate: (variables) => {
            console.log('프로필 수정 중..', variables);
        },
        onError: (error, variables, context) => {
            if (error.response.data.status == 401) {
                console.log('로그인 되지 않음', error.response);
                router.push({ pathname: '/auth/login', query: { redirect: router.asPath } });
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('프로필 수정 성공..', data);
        },
    });
};

const validate = (input: updateMeInput) => {
    if (!input.title) {
        alert('빈 칸이 있습니다.');
        return false;
    }
    return true;
};

export default useUpdateMe;
