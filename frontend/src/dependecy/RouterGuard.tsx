// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';

// import components

// import etc

const RouterGuard = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const isLogin = useTypedSelector((state) => state.user.isLogin);

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
    }, [isLogin]);

    const authCheck = (url) => {
        // console.log('RouterGuard: ', router.pathname);
        // console.log('authCheck:', url);
        const token = Cookies.get('token');
        const publicPaths = ['/', '/auth/login', '/auth/signup', '/board', '/post/[id]', '/user/[id]'];
        const path = url.split('?')[0];

        console.log('path:', path);
        console.log('isLogin:', isLogin);

        if (!token && !isLogin && !publicPaths.includes(path)) {
            console.log('need login');
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
