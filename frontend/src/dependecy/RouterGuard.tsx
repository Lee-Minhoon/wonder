import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RouterGuard = ({ children }: any) => {
    const [auth, setAuth] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            setAuth(true);
        } else {
            setAuth(false);
            router.replace('/login');
        }
    }, []);

    return auth && children;
};

export { RouterGuard };
