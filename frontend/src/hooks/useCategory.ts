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
