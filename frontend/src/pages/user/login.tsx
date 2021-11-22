import axios from 'axios';
import Login from 'components/layout/Login';


export default function login() {
    // const url = 'http://localhost:8081/auth/login';
    // axios.post(url, null, {
    //     params: {
    //         id: 'admin', password: '1234'
    //     }
    // }).then(reponse => console.log(reponse));

    return (
        <div className="flex">
            <Login />
        </div>
    )
}
