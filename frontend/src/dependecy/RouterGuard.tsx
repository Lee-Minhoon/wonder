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
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authCheck = (url) => {
        const token = Cookies.get('token');

        if (!token && url != '/auth/login') {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
            });
        } else {
            setAuthorized(true);
        }
    };

    return authorized && children;
};

export { RouterGuard };
