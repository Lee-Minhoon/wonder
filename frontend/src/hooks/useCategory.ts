import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import category from 'constants/category';

const useCategory = () => {
    const router = useRouter();
    const [main, setMain] = useState(null);
    const [sub, setSub] = useState(null);

    useEffect(() => {
        const mainValue = category.find((item) => item.url === router.query.main);
        const subValue = mainValue?.sub.find((item) => item.url === router.query.sub);
        setMain(mainValue);
        setSub(subValue);
    }, [router.query.main, router.query.sub]);

    return { main, sub };
};

export default useCategory;
