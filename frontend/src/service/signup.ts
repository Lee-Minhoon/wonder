import axios from 'axios';
import { sigunInput } from 'components/layout/Signup';
import { AxiosService } from './defaultAxiosService';

const signup = (id, password, check, nickname) => {
    if (validate(id, password, check, nickname)) {
        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, null, {
                params: {
                    id: id,
                    password: password,
                    nickname: nickname,
                },
            })
            .then((reponse) => {
                console.log(reponse);
                // alert(`${reponse.data.nickname}님 가입을 환영합니다.`);
                return true;
            });
    } else {
        console.log('test');
        return false;
    }
};

const signupValidation(...inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i]) return false;
    }
    return true;
}

const signup2 = async (input: sigunInput) => {
    if (!signupValidation(input)) return;

    const {data} = await AxiosService.instance.post('signup', {
        params: {
            id: input.id,
            password: input.password,
        }
    })

    const token = data.token
    AxiosService.addHeaderToken(token);
    return data;
}

const validate = (id, password, check, nickname) => {
    if (!id || !password || !nickname) {
        alert('빈 칸이 있습니다.');
        return false;
    } else if (password.length < 8) {
        alert('비밀번호를 8자 이상 입력하세요.');
        return false;
    } else if (password != check) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    return true;
};

export default signup;
