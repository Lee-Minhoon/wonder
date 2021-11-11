import styles from './styles.module.scss';
import Link from 'next/link';
import wrapper from 'redux/store';

export default function Util() {
    return (
        <div className={styles.util}>
            몇개의 글
            몇개씩 보기
            <Link href="write">
                <a>
                    글쓰기
                </a>
            </Link>
        </div>
    )
}
