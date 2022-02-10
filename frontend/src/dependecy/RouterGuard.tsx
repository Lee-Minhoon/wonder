// import package, library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
        console.log('auth check');
        console.log(isLogin);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, router]);

    const authCheck = (url) => {
        // console.log('RouterGuard: ', router.pathname);
        // console.log('authCheck:', url);
        console.log('url:', url, ' / isLogin:', isLogin);
        const publicPaths = ['/', '/auth/login', '/auth/signup', '/board/list', '/message/write'];
        const path = url.split('?')[0];

        if (!isLogin && !publicPaths.includes(path)) {
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
