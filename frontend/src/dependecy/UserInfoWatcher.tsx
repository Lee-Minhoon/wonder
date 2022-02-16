// import package, library
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';
import { login, logout } from 'state/user/action';
import useReadMe from 'hooks/user/useReadMe';
import { useRouter } from 'next/router';

// import components

// import etc

const UserInfoWatcher = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const token = Cookies.get('token');
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    const dispatch = useDispatch();

    const { data, error, isLoading, isSuccess, isError, refetch } = useReadMe();

    useEffect(() => {
        if (token && !isLogin) {
            console.log('refetching...');
            console.log(data?.data);
            refetch().then((data) => {
                const loginUser = data?.data?.data;
                dispatch(login(loginUser?.id, loginUser?.nickname));
                console.log('login succeed');
                if (router.pathname === '/auth/login') {
                    router.push(router.query?.redirect?.toString());
                }
            });
        }
        if (!token) {
            dispatch(logout());
            console.log('logout succeed');
        }
    }, [data?.data, dispatch, isLogin, refetch, router, token]);

    // useEffect(() => {
    //     if (isSuccess && data?.data) {
    //         const user = data?.data;
    //         dispatch(login(user.id, user.nickname));
    //         console.log('re-render');
    //     }
    // }, [data?.data, dispatch, isSuccess]);

    return children;
};

export { UserInfoWatcher };
