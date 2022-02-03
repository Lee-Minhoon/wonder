// import package, library
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// import utilities

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
        console.log('RouterGuard: ', router.pathname);
        console.log('authCheck:', url);
        const token = Cookies.get('token');
        const publicPaths = ['/auth/login'];
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
