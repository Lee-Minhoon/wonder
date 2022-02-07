// import package, library
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import utilities
import { login, logout } from 'state/user/action';
import useTypedSelector from 'hooks/useTypedSelector';

// import components

// import etc

const RouterGuard = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    console.log('라우터 가드 실행되고나서: ', isLogin);

    useEffect(() => {
        const url = router.pathname;
        authCheck(url, isLogin);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authCheck = (url, isLogin) => {
        // console.log('RouterGuard: ', router.pathname);
        // console.log('authCheck:', url);
        const publicPaths = ['/', '/auth/login', '/auth/signup', '/board/list'];
        const path = url.split('?')[0];

        console.log(path);
        console.log(isLogin);
        if (!isLogin && !publicPaths.includes(path)) {
            console.log('need login');
            console.log(isLogin);
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
                query: { redirect: url },
            });
        } else {
            setAuthorized(true);
        }
    };

    return authorized && children;
};

export { RouterGuard };
