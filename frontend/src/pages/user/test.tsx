import axios from 'axios';
import { AxiosService } from 'service/defaultAxiosService';

export default function login() {
    AxiosService.instance.get('user/test').then((res) => console.log(res));
    const axiosService = AxiosService.instance;
    console.log(axiosService.defaults.headers.common.Authorization);

    return (
        <>
            <div>test</div>
        </>
    );
}
