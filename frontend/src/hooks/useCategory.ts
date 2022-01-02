// import { useRouter } from 'next/router';

// // import constants
// import category from 'constants/category';
// import { useEffect, useState } from 'react';

// const useCategory = () => {
//     const router = useRouter();
//     const [main, setMain] = useState(null);
//     const [sub, setSub] = useState(null);
//     useEffect(() => {
//         const mainQuery = router.query.main;
//         const subQuery = router.query.sub;
//         const _main = category.find((item) => item.url === mainQuery);
//         const _sub = _main?.sub.find((item) => item.url === subQuery);
//         setMain(_main);
//         setSub(_sub);
//     }, [router.query.main, router.query.sub, main, sub]);
//     return { main, sub };
// };

// export default useCategory;

import { useRouter } from 'next/router';

// import constants
import category from 'constants/category';

const useCategory = () => {
    const router = useRouter();
    const mainQuery = router.query.main;
    const subQuery = router.query.sub;
    const main = category.find((item) => item.url === mainQuery);
    if (!main) return null;
    const sub = main.sub.find((item) => item.url === subQuery);
    if (!sub) return null;

    return { main, sub };
};

export default useCategory;
