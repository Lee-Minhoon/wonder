import axios from 'axios';
import { AxiosService } from 'service/defaultAxiosService';

export default function login() {
    AxiosService.instance.get('user/test').then((res) => console.log(res));

    return <div>test</div>;
}
