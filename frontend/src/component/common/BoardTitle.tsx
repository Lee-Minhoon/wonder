import styles from './styles.module.scss';
import Link from 'next/link';

export default function BoardTitle(props) {
    return (
        <div className={styles.title}>
            <Link href="/board/list"><a>게시판 제목</a></Link>
        </div>
    )
}