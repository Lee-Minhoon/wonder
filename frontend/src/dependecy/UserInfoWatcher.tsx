// import package, library
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';
import { login, logout } from 'state/user/action';
import useReadMyself from 'hooks/user/useReadMyself';

// import components

// import etc

const UserInfoWatcher = ({ children }: { children: JSX.Element }) => {
    const token = Cookies.get('token');
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    const dispatch = useDispatch();

    const { data, error, isLoading, isSuccess, isError, refetch } = useReadMyself();

    useEffect(() => {
        if (token && !isLogin) {
            refetch();
        }
        if (!token) {
            dispatch(logout());
        }
    }, [data?.data, dispatch, isLogin, isSuccess, refetch, token]);

    useEffect(() => {
        if (isSuccess && data?.data) {
            const user = data?.data;
            dispatch(login(user.id, user.nickname));
            console.log('re-render');
        }
    }, [data?.data, dispatch, isSuccess]);

    return children;
};

export default UserInfoWatcher;
