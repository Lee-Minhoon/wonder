import axios from 'axios';
import Login from 'component/layout/login/container';


export default function Page() {
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
