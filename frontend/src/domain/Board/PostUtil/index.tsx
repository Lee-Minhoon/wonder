import Link from 'next/link';
import { useRouter } from 'next/router';

import category from 'constants/category';

// import styles
import styles from '../styles.module.scss';

const PostUtil = () => {
    const router = useRouter();
    const main = router.query.main;
    const sub = router.query.sub;
    return (
        <div className={styles.util}>
            몇개의 글 몇개씩 보기
            <Link href={{ pathname: '/board/write', query: { main: main, sub: sub } }}>
                <a>글쓰기</a>
            </Link>
        </div>
    );
};

export default PostUtil;
