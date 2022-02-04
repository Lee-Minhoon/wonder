// import package, library
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import utilities
import { login, logout } from 'state/user/action';

// import components

// import etc

const RouterGuard = ({ children }: { children: JSX.Element }) => {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const url = router.pathname;
        authCheck(url);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authCheck = (url) => {
        // console.log('RouterGuard: ', router.pathname);
        // console.log('authCheck:', url);
        const token = Cookies.get('token');
        const publicPaths = ['/', '/auth/login', '/board/list', '/board/'];
        const path = url.split('?')[0];

        if (!token && !publicPaths.includes(path)) {
            console.log('로그아웃 확인');
            setAuthorized(false);
            dispatch(logout());
            router.push({
                pathname: '/auth/login',
                query: { redirect: url },
            });
        } else if (token) {
            console.log('로그인 확인');
            setAuthorized(true);
            dispatch(login(1, '이민훈'));
        } else {
            setAuthorized(true);
        }
    };

    return authorized && children;
};

export { RouterGuard };
