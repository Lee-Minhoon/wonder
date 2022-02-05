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
        const publicPaths = ['/', '/auth/login', '/auth/signup', '/board/list', '/board/'];
        const path = url.split('?')[0];

        if (!token && !publicPaths.includes(path)) {
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
