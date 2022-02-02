// import package, library
import Cookies from 'js-cookie';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

const useLogout = () => {
    Cookies.remove('token');
    AxiosService.addHeaderToken('');

    return 0;
};

export default useLogout;
