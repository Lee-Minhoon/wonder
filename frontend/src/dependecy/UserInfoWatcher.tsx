// import package, library
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';
import { login, logout } from 'state/user/action';
import useReadMe from 'hooks/user/useReadMe';

// import components

// import etc

const UserInfoWatcher = ({ children }: { children: JSX.Element }) => {
    const token = Cookies.get('token');
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    const dispatch = useDispatch();

    const { data, error, isLoading, isSuccess, isError, refetch } = useReadMe();

    useEffect(() => {
        if (token && !isLogin) {
            console.log('refetching...');
            // refetch();
            refetch().then(() => {
                const user = data?.data;
                dispatch(login(user?.id, user?.nickname));
                console.log('re-render');
            });
        }
        if (!token) {
            console.log('not exist token');
            dispatch(logout());
        }
    }, [data?.data, dispatch, isLogin, refetch, token]);

    // useEffect(() => {
    //     if (isSuccess && data?.data) {
    //         const user = data?.data;
    //         dispatch(login(user.id, user.nickname));
    //         console.log('re-render');
    //     }
    // }, [data?.data, dispatch, isSuccess]);

    return children;
};

export default UserInfoWatcher;
