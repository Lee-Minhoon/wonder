import { loginInput } from 'container/LoginForm';
import { AxiosService } from '../defaultAxiosService';

const asdf = async (input: loginInput) => {
    try {
        var { data } = await AxiosService.instance.post(
            'post/test',
            {
                email: input.email,
                password: input.password,
            },
            null
        );
    } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        return;
    }

    return data;
};

export default asdf;
